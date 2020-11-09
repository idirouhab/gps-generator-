const http = require("https");
const random_name = require('node-random-name');
const randomLocation = require('random-location')
const options = {
    "method": "POST",
    "hostname": "insights-collector.eu01.nr-data.net",
    "port": null,
    "path": `/v1/accounts/${proess.env.ACCOUNT_ID}/events`,
    "headers": {
        "X-Insert-Key": process.env.NEW_RELIC_INSERT_KEY,
        "Content-Type": "application/json",
    }
};

const P = {
    latitude: 41.12104295216511,
    longitude: 1.2561122773129636
}
const R = 1500


setInterval(function () {
    const req = http.request(options, function (res) {
        const chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            console.log(body.toString());
        });
    });
    const randomPoint = randomLocation.randomCirclePoint(P, R)
    req.write(JSON.stringify([
        {
            eventType: 'Location',
            rider: random_name({first: true}),
            lat: randomPoint.latitude,
            long: randomPoint.longitude,
        },

    ]));
    req.end();
    console.log(data);
}, 60 * 1000)
