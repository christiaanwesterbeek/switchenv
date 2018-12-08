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

test('Core throws error with incorrect arguments', async t => {
    await core({}).catch(error => {
        t.ok(
            error,
            'throwed an error when keepassFile is empty (--source parameter)'
        );
    });

    await core({
        keepassFile,
    }).catch(error => {
        t.ok(
            error,
            'throwed an error when keepassKeyfile is empty (--key parameter)'
        );
    });

    await core({
        keepassFile,
        keepassKeyfile,
        entryTitleTemplate: 'wrong',
    }).catch(error => {
        t.ok(
            error,
            'throwed an error when entryTitleTemplate does not contain {title} (--title parameter)'
        );
    });

    await core({
        keepassFile,
        keepassKeyfile,
        entryTitleTemplate: '{title}',
    }).catch(error => {
        t.ok(
            error,
            "throwed an error when no title to lookup was provided (that's the `development` in `yarn switchenv development`)"
        );
    });

    t.end();
});

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
