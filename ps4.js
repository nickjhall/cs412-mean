const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const routes = express.Router();

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
        console.log("Promise success");
        res.render('results', {queryTerms: req.body.promise, movieData: result.results});
    });
});

routes.post('/async', async (req, res) => {
    const queryTerms = encodeURIComponent(req.body.async);
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + process.env.TMBD_KEY + "&query=" + queryTerms;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Async success");
    res.render('results', {queryTerms: req.body.async, movieData: data.results});
});

routes.post('/callback', (req, res) => {
    res.render('index', {});
});

module.exports = routes;