const https = require('https');
const fs = require('fs');
const mysql = require('mysql');
const dataStr = fs.readFileSync('top10000_pv_kwd.txt', 'utf-8');
const dataArr = dataStr.split('\n');

function getData(count, cb) {
    if (count < 4000) {
        const keyWord = dataArr[count];
        const encode = encodeURIComponent(keyWord);
        const url = `https://www.toutiao.com/search_content/?offset=0&format=json&keyword=${encode}&autoload=true&count=20&cur_tab=1`;
        https.get(url, function (res) {
            let data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                fs.writeFileSync(`./dataFinal/finalData-${count + 1}.txt`, data);
                getData(count + 1)
            });
        }).on("error", function () {
            console.log('error');
        });
    } else {
        cb && cb();
    }
}

getData(0);