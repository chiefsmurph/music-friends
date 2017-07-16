var rr = (what) => require('electron').remote.require(what);

var request = rr('request');
request = request.defaults({jar: true});

var cheerio = rr('cheerio');


var makeRequestWithCheerio = (url, cb) => {

    return new Promise((resolve, reject) => {

        var options = {
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
            }
        };

        request(options, function (err, res, body) {
            if (err) return reject(err);
            var $ = cheerio.load(body);
            resolve($);
        });

    });

};

window.makeRequestWithCheerio = makeRequestWithCheerio;
