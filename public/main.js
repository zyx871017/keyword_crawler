// 封装请求
const status = [
    '未处理',
    '完成',
    '失败'
];

const request = function (url, option,) {
    const opt = Object.assign({}, {
        hearders: {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }, option);
    return new Promise(function (resolve, reject) {
        fetch(url, opt)
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else {
                    reject(response);
                }
            })
            .then(function (res) {
                resolve(res)
            })
            .catch(function (res) {
                return res;
            })
    })
};

const test = request('http://localhost:8080/getTaskList')
    .then(function (res) {
        let innerHtml = document.getElementsByTagName('tbody')[0].innerHTML;
        res.forEach(function (item) {
            innerHtml += `<tr>`;
            innerHtml += `<td>${item.id}</td><td>${item.name}</td><td>${status[item.status]}</td>`;
            innerHtml += `<td>${item.start_time}</td><td>${item.start_index}</td><td></td>`;
            innerHtml += `</tr>`;
        });
        document.getElementsByTagName('tbody')[0].innerHTML = innerHtml;
    });

