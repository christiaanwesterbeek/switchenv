const kdbxweb = require('kdbxweb');
const fs = require('fs');
const path = require('path');
const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);
fs.writeFileAsync = util.promisify(fs.writeFile);

const readEntries = async ({ cwd, keepassFile, keepassKeyfile }) => {
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

module.exports = readEntries;
