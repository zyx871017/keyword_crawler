const express = require('express');
const app = express();
const config = require('./config');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});
const upload = multer({storage: storage});


const mysql = require('mysql');
const connection = mysql.createConnection(config.mysql);

connection.connect();

app.use(express.static('public'));

app.get('/getTaskList', function (req, res) {
    connection.query('SELECT * FROM crawler_task', function (err, data) {
        res.send(data);
    });
});

app.post('/save_task', upload.single('logo'), function (req, res) {
    const fileName = req.file.filename;
    const startIndex = parseInt(req.body.startIndex);
    const startTime = '2017-11-13';
    connection.query(`INSERT crawler_task (name,start_time,start_index) VALUES ("${fileName}","${startTime}",${startIndex})`, function (err) {
        if (err) {
            console.log(err);
            res.send({retCode: -1, message: 'save error'});
        }
        else {
            res.redirect('/index.html');
        }
    });
});

const server = app.listen(8080, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});