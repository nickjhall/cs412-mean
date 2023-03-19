let express = require('express');
let routes = express.Router();

routes.get('/', (req, res) => {
    res.render('index', {});
});

module.exports = routes;