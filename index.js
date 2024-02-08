// Write to the file locally
const fs = require('fs')

// Needed for parsing a ref. https://github.com/APIDevTools/json-schema-ref-parser
const $RefParser = require("@apidevtools/json-schema-ref-parser");

// TODO parse yaml files
const yaml = require('js-yaml')

const { program } = require('commander');

(async () => {
    try {
        program
        .requiredOption('-f, --infile', 'Input file must be specified');

        program.parse();
      
        const options = program.opts();
        // const limit = options.first ? 1 : undefined;
        console.log(program.args[0]);

        // load the file from the location in the argument.
        const openapi_document = yaml.load(fs.readFileSync(program.args[0], 'utf8'));

        let schema = await $RefParser.dereference(openapi_document);

        let stringified_openapi_document = JSON.stringify(schema, null, 2);

        fs.writeFile('./openapi_dereferenced.json', stringified_openapi_document, err => {
            if (err) {
                console.error(err)
                return
            }
            //file written successfully
            })
      }
      catch(err) {
        console.error(err);
      }

}
)();
