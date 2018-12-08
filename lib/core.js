const fs = require('fs');
const path = require('path');
const readEntries = require('./readEntries');
const findEntryContent = require('./findEntryContent');

const core = async ({
    cwd,
    keepassFile,
    keepassKeyfile,
    targetFile = '.env',
    entryTitleTemplate = '{title}',
    title,
}) => {
    if (!keepassFile) {
        throw new Error(
            '--source parameter is required. Use for example --source /envs/keepass.kdbx'
        );
    }

    if (!keepassKeyfile) {
        throw new Error(
            '--key parameter is required. Use for example --key /envs/keyfile.kdbx'
        );
    }

    if (/{title}/.test(entryTitleTemplate)) {
        throw new Error(
            '--title parameter must contain {title}. Use for example --title .env-{title}-backend'
        );
    }

    if (!title) {
        throw new Error(
            'environment title missing. You should run as `yarn switchenv development` or `npm run switchenv development`'
        );
    }

    const entries = await readEntries({ cwd, keepassFile, keepassKeyfile });

    const { content, entryTitle } = await findEntryContent({
        entries,
        entryTitleTemplate,
        title,
    });

    console.log(`Writing the Notes of ${entryTitle} to ${targetFile} ...`);

    await fs.writeFileAsync(path.join(cwd, targetFile), content);
};

module.exports = core;
