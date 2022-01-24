// Write to the file locally
const fs = require('fs')

// Needed for parsing a ref
const $RefParser = require("@apidevtools/json-schema-ref-parser");

// Must specify the openapi_document that may include external or references
const openapi_document = require("./petstore.json");

(async () => {
    try {
        let schema = await $RefParser.dereference(openapi_document);
        console.log(schema.paths['/pet']['post'].requestBody.content['application/json']);

        // console.log(JSON.stringify(schema))

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

      
    // const content = 'Some content!'


}
)();