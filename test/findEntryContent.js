const test = require('tape');
const readEntries = require('../lib/readEntries');
const findEntryContent = require('../lib/findEntryContent');

const cwd = process.cwd();

const getEntries = async () => {
    const keepassFile = './test/fixtures/keepass.kdbx';
    const keepassKeyfile = './test/fixtures/keyfile';
    const entries = await readEntries({
        cwd,
        keepassFile,
        keepassKeyfile,
    }).catch(e => {
        console.error(e);
    });

    return entries;
};

test('Will throw an error when looking for non existant title', async t => {
    const entries = await getEntries();

    await findEntryContent({
        entries,
        entryTitleTemplate: '{title}',
        title: 'non-existant-title',
    }).catch(error => {
        t.ok(error, 'throwed an error');
    });

    t.end();
});

test('Finds entry and content', async t => {
    const entries = await getEntries();

    const { content, entryTitle } = await findEntryContent({
        entries,
        entryTitleTemplate: '{title}',
        title: 'development',
    }).catch(t.error);

    t.equal(entryTitle, 'development', 'found the correct entry');
    t.equal(
        content,
        '## Test\nSOME_KEY=7MnN-development',
        'it has the expected content'
    );

    t.end();
});

test('Finds entry and content with flexible titles', async t => {
    const entries = await getEntries();

    const { content, entryTitle } = await findEntryContent({
        entries,
        entryTitleTemplate: 'appz-{title}',
        title: 'development',
    }).catch(t.error);

    t.equal(entryTitle, 'appz-development', 'found the correct entry');
    t.equal(
        content,
        '## Test\nSOME_KEY=BAef-appz-development',
        'it has the expected content'
    );

    t.end();
});
