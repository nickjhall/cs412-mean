let express = require('express');
let app = express();
let routes = require('./ps4.js');

app.set('view engine', 'pug');
app.use('/ps4', routes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});