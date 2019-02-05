const express = require('express')
const expressFilupload = require('express-fileupload');
const app = express();

app.use(expressFilupload());
// default options
const port = 3000;

app.get('/', (req, res) => res.sendFile('./index.html', {
    root: __dirname
}));

app.post('/images', (req, res) => {

    if (!req.body || !req.body.image) {
        res.send("File was not found");
        return;
    }

    var base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("out.png", base64Data, 'base64', function (err) {
        console.log(err);
    });

    res.send("File Uploaded");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))