const argv = require('minimist')(process.argv.slice(2));
const core = require('./lib/core');

const cwd = process.cwd();
const {
    source: keepassFile,
    key: keepassKeyfile,
    // optional arguments
    target: targetFile,
    title: entryTitleTemplate,
    _: [title],
} = argv;

core({
    cwd,
    keepassFile,
    keepassKeyfile,
    targetFile,
    entryTitleTemplate,
    title,
})
    .then(() => {
        console.log('Done');
    })
    .catch(result => {
        console.log('err', result);
    });
