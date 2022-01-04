/* Required modules for this app to work, copied from class */

const   http = require('http'), //This module provides the HTTP server functionalities
        path = require('path'), //The path module provides utilities for working with file and directory paths
        express = require('express'), //This module allows this app to respond to HTTP requests, defines the routing and renders back the required content
        fs = require('fs'), //This module allows to work with the file system: read and write files back
        xmlParse = require('xslt-processor').xmlParse, //This module allows to work with XML files
        xsltProcess = require('xslt-processor').xsltProcess, //The same module allows us to uitlise XSL Transformations
        xml2js = require('xml2js'); //This module does XML <-> JSON conversion

const router = express(); //Creates new instance 
const server = http.createServer(router); //Creates server instance

router.get('/', function(req, res) {

    res.writeHead(200, {'Content-Type' : 'text/html'}); 
    
    /* Reads files */
    let xml = fs.readFileSync('t-shop.xml', 'utf8'), 
        xsl = fs.readFileSync('t-shop.xsl', 'utf8');

    /* Parses so the string becomes xml objects */
    let doc = xmlParse(xml),
        stylesheet = xmlParse(xsl);

    /* Applies the xsltprocess to get a result */
    let result = xsltProcess(doc, stylesheet);

    /* Converts the html file back to String for user */
    res.end(result.toString());

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});