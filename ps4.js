let express = require('express');
let request = require('request');
let routes = express.Router();

routes.get('/', (req, res) => {
    res.render('index', {});
});

routes.post('/promise', (req, res) => {
    new Promise((resolve, reject) => {
        const queryTerms = encodeURIComponent(req.body.promise);
        const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + process.env.TMBD_KEY + "&query=" + queryTerms;
        request({url: url, json: true}, (err, response, body) => {
            resolve(body);
        })
    }).then((result) =>
    {
        console.log("Movie data success");
        res.render('results', {queryTerms: req.body.promise, movieData: result.results});
    });
});

routes.post('/async', (req, res) => {
    res.render('index', {});
});

routes.post('/callback', (req, res) => {
    res.render('index', {});
});

module.exports = routes;