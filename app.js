const yargs = require("yargs");
const utils = require("./utils");


yargs.command({
    command: "$0",
    describe: "Search and displays stackoverflow results for queries on google search",
    builder: {
        text: {
            describe: "Query text",
            type: "string",
            demandOption: true,
        },
    },
    handler: function (argv) {
        utils.searchGoogle(argv.text);
    },
});

yargs.parse();