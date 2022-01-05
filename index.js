/* Required modules for this app to work, copied from class (includes some Mikhail's comments) */

const http = require('http'), //This module provides the HTTP server functionalities
    path = require('path'), //The path module provides utilities for working with file and directory paths
    express = require('express'), //This module allows this app to respond to HTTP requests, defines the routing and renders back the required content
    fs = require('fs'), //This module allows to work with the file system: read and write files back
    xmlParse = require('xslt-processor').xmlParse, //This module allows to work with XML files
    xsltProcess = require('xslt-processor').xsltProcess, //The same module allows us to uitlise XSL Transformations
    xml2js = require('xml2js'); //This module does XML <-> JSON conversion

const router = express(); //Creates new instance 
const server = http.createServer(router); //Creates server instance

router.use(express.static(path.resolve(__dirname, 'views'))); //Use the views folder to serve the file
router.use(express.urlencoded({ extended: true })); //We allow the data sent from the client to be encoded in a URL targeting our end point
router.use(express.json()); //We include support for JSON

// Function to read in XML file and convert it to JSON
function XMLtoJSON(filename, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function (err, xmlStr) {
        if (err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
};

//Function to convert JSON to XML and save it
function JSONtoXML(filename, obj, cb) {
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
};

router.post('/post/json', function (req, res) {

    /* This function increases the overall number of sold items */
    function quantityIncrease(obj) {

        console.log(obj)

        XMLtoJSON('t-shop.xml', function (err, result) {
            if (err) throw (err);
            console.log(JSON.stringify(result, null, "  "));
            if (obj.Quantity != ''){           //the != '' prevents the number of becoming "NaN" in case an empty form is submitted.
                let oldQuantity = parseInt(result.catalogue.product[obj.sec_n].quantity); // The input type is number but created as a String so parsing is needed.
                let newQuantity = oldQuantity + parseInt(obj.Quantity); // New Quantity is the old quantity + the quantity input on the form 
                result.catalogue.product[obj.sec_n].quantity = newQuantity.toString(); // The conversion back to string so it can be properly displayed.
            }           

            JSONtoXML('t-shop.xml', result, function(err){
                if (err) console.log(err);
            });
        });
    };

    quantityIncrease(req.body);

    console.log(req.body)

    res.redirect('back');

});

router.get('/get/html', function (req, res) {

    res.writeHead(200, { 'Content-Type': 'text/html' });

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

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port)
});