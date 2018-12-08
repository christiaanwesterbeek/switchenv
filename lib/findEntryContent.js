const suppplant = require('suppplant');

const findEntryContent = ({ entries, entryTitleTemplate, title }) => {
    const entryTitle = suppplant(entryTitleTemplate.toLowerCase(), {
        title,
    });
    const filteredEntries = entries
        .filter(entry => entry.fields && entry.fields.Title === entryTitle)
        .map(entry => entry.fields.Notes);

    if (filteredEntries.length !== 1) {
        throw new Error(
            `Exactly 1 entry expected, but ${
                filteredEntries.length
            } are found by title ${entryTitle}`
        );
    }

    const [content] = filteredEntries;

    return { content, entryTitle };
};

module.exports = findEntryContent;
