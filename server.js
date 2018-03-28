'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer')
// require and use "multer"...

var upload = multer({dest: './assets/'}).single("upfile")
var app = express();


app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      res.send(err)
    } else {
      res.send({name: req.file.originalname, type: req.file.mimetype, size: req.file.size}|| "test")
    }
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
