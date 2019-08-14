const express = require('express');
const app = express();
const port = 3000;
const data = require('./MOCK_DATA');

// This shows what we're requesting in the terminal
app.use(function(req, res, next){
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Display all data in browser by adding "/all" endpoint in browser url
// app.get('/all', function(req, res){
//     res.json(data);
// });

// Get all the items that are in stock by adding "/instock/i=true" to browser url
// Get all the items that are not in stock by adding "/instock/i=false" to browser url
app.get('/instock/i=:instockCheck', function(req, res){
    const instockParam = req.params.instockCheck;
    if ((instockParam == 'true') || (instockParam == 'false')) {
        let filteredData = [];
        for (var i = 0; i < data.length; i++) {
            if(instockParam === data[i].in_stock.toString()){
                filteredData.push(data[i]);
            }
        };
        res.send(filteredData);
    } else {
        res.send('Invalid parameter!!')
    }
});

// Get min price of the items by adding ???"/price/p=min"??? to browser url
app.get('/price/p=:priceCheck', function(req, res){
    const minPriceParam = req.params.priceCheck;
        let filteredData = [];
        for (var i = 0; i < data.length; i++) {
            if(minPriceParam >= data[i].product_price.toString()){
                filteredData.push(data[i]);
        };
        res.send(filteredData);
        } else {
            res.send('Invalid parameter!!')
        }
});


app.listen(port, () => console.log(`application is running on port ${port}`));
