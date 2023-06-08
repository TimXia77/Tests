const NodeCache = require("node-cache");
const cache = new NodeCache();

const { promisify } = require('util');
const sleep = promisify(setTimeout);

module.exports = duration => (req, res, next) => {
    if (req.method !== "GET") {
        console.log("Cannot cache non-GET req!"); //testing, remove me later
        return next();
    } else {
        const key = req.originalUrl;
        const cachedResponse = cache.get(key);

        if (cachedResponse != undefined){
            console.log("Cache Hit!"); //testing, remove me later
            res.send(cachedResponse);
        } else {

            console.log("Cache Miss!"); //testing, remove me later

            //Learn more?
            res.originalSend = res.send;
            res.send = async body => { //setting body of res to cache, so any responses will also go to cache.
                await sleep(2000); //artifical wait time for processing data or other operations
                res.originalSend(body);
                cache.set(key, body, duration);
            };
            next();
        }
    }


};