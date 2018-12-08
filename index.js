const kdbxweb = require('kdbxweb');
const fs = require('fs');
const path = require('path');
const util = require('util');
const argv = require('minimist')(process.argv.slice(2));
fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

const {
    f: keepassFile,
    k: keepassKeyfile,
    _: [keepassEntryTitle],
} = argv;

const cwd = process.cwd();

const read = async () => {
    const keyFileArrayBuffer = await fs.readFileAsync(
        path.join(cwd, keepassKeyfile)
    );
    const dataAsArrayBuffer = await fs.readFileAsync(
        path.join(cwd, keepassFile)
    );
    const credentials = new kdbxweb.Credentials(
        kdbxweb.ProtectedValue.fromString(''), // keyfile only kdbx file
        keyFileArrayBuffer.buffer
    );
    const db = await kdbxweb.Kdbx.load(dataAsArrayBuffer.buffer, credentials);

    const entries = db.getDefaultGroup().entries;

    return entries;
};

read()
    .then(entries => {
        const filteredEntries = entries
            .filter(
                entry =>
                    entry.fields && entry.fields.Title === keepassEntryTitle
            )
            .map(entry => entry.fields.Notes);

        if (filteredEntries.length !== 1) {
            throw new Error(
                `Exactly 1 entry expected, but ${
                    filteredEntries.length
                } are found by title ${keepassEntryTitle}`
            );
        }

        const [content] = filteredEntries;

        console.log(`Writing the Notes of ${keepassEntryTitle} to .env ...`);
        return content;
    })
    .then(content => {
        return fs.writeFileAsync(path.join(cwd, '.env'), content);
    })
    .then(() => {
        console.log('Done');
    })
    .catch(result => {
        console.log('err', result);
    });
