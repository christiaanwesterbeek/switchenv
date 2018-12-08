const test = require('tape');
const readEntries = require('../lib/readEntries');

const cwd = process.cwd();

test('Will throw error when keepass or key file does not exists', async t => {
    const keepassFile = './non-existant-file.kdbx';
    const keepassKeyfile = './non-existant-file';

    const entries = await readEntries({
        cwd,
        keepassFile,
        keepassKeyfile,
    }).catch(error => {
        t.ok(error, 'throwed an error');
    });

    t.notOk(entries, 'and entries is empty');

    t.end();
});

test('Reads keepass entries', async t => {
    const keepassFile = './test/fixtures/keepass.kdbx';
    const keepassKeyfile = './test/fixtures/keyfile';

    const entries = await readEntries({
        cwd,
        keepassFile,
        keepassKeyfile,
    }).catch(t.error);

    t.ok(entries, 'there are entries');
    t.ok(entries.length, 'it is an array');
    t.equal(entries.length, 3, 'and length is 3');
    entries.forEach((entry, index) => {
        t.ok(entry.fields.Title, `entry ${index + 1} has a Title`);
        t.ok(
            entry.fields.Notes,
            `entry ${index + 1} has Notes (future .env contents)`
        );
    });

    t.end();
});
