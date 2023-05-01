const express = require('express');
const routes = express.Router();
const https = require('https');

routes.post('/getPopularMoviesFromYear', async (req, res) => {
    const year = encodeURIComponent(req.body.year)
    console.log(year)
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.TMBD_KEY
        + '&primary_release_year=' + year + '&sort_by=vote_average.desc'
    await https.get(url, response => {
        let data = []
        response.on('data', chunk => {
            data.push(chunk)
        })

        response.on('end', () => {
            console.log("end of response")
            const movieData = JSON.parse(Buffer.concat(data).toString())
            res.json(movieData)
        })
    })
})

module.exports = routes;