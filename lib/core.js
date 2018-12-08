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
