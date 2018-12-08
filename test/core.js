const test = require('tape');
const path = require('path');
const fs = require('fs');
const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);
fs.unlinkAsync = util.promisify(fs.unlink);

const core = require('../lib/core');

const cwd = process.cwd();

const keepassFile = './test/fixtures/keepass.kdbx';
const keepassKeyfile = './test/fixtures/keyfile';
const entryTitleTemplate = '{title}';
const title = 'development';

test('Integration (core)', async t => {
    const targetFile = '/test/.env';
    await core({
        cwd,
        keepassFile,
        keepassKeyfile,
        targetFile,
        entryTitleTemplate,
        title,
    });

    const content = await fs.readFileAsync(
        path.join(cwd, '/test/.env'),
        'utf8'
    );

    t.equal(
        content,
        '## Test\nSOME_KEY=7MnN-development',
        'a file was safed at the expected location with the expected content'
    );

    await fs.unlinkAsync(path.join(cwd, '/test/.env'));

    t.end();
});
