const express = require('express');
const routes = express.Router();
const https = require('https');
const redis = require('redis');
let client;
(async () => {
    client = redis.createClient();

    client.on("error", (error) => console.error(`Error : ${error}`));

    await client.connect();
    console.log('connected to redis client')
})();

routes.post('/getPopularMoviesFromYear', async (req, res) => {
    const year = encodeURIComponent(req.body.year)
    const cached = await client.get(year)
    if (await client.get(year)) {
        console.log('year is cached')
        let movieData = await client.get(year)
        res.json({
            movieData: JSON.parse(movieData),
            fromCache: true
        })
    } else {
        console.log("year is not cached")
        const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.TMBD_KEY
            + '&primary_release_year=' + year + '&sort_by=vote_average.desc'
        const response = await https.get(url, response => {
            let data = []
            response.on('data', chunk => {
                data.push(chunk)
            })

            response.on('end', async () => {
                console.log("end of response")
                const movieData = JSON.parse(Buffer.concat(data).toString())
                await client.set(year, JSON.stringify(movieData))
                await client.expire(year, 60)
                res.json({
                    movieData: movieData,
                    fromCache: false
                })
            })
        })
    }
})

module.exports = routes;