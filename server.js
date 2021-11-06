const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/payment-poc-ui'));

app.get('/*', (req,res) => {
    res.sendFile('index.html', {root: 'dist/payment-poc-ui'})
});

app.listen(process.env.PORT || 8080);