// const config = require('dotenv').config()

var bodyParser = require('body-parser')
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({

    // Replace with your key_id
    key_id: "rzp_test_UZKZM6ZVtATgfZ",

    // Replace with your key_secret
    key_secret: "OrBeatb9NdILOgBCogOS1LRG"
});

const app = express();
const PORT = process.env.port || '5000';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({origin: 'http://localhost:3000'}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// parse application/json
app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log("Server is Listening on Port ", PORT);
});


app.post('/createOrder', (req, res) => {
    console.log(req.method, '/createOrder');
    // STEP 1:
    console.log(req.body);
    const { amount, currency, receipt, notes } = req.body;

    //STEP 2:    
    razorpayInstance.orders.create({ amount, currency, receipt, notes },
        (err, order) => {
            // console.log(order);
            //STEP 3 & 4: 
            if (!err)
                res.json(order)
            else
                res.send(err);
        }
    )
    /////////inv_Jv9e6JB8spdZzH
//pay_Jv9Z1HHqOmjQU1
//4cb45a67fc5c16c4349100b32fa51ace5d79e8010431ea6be3e17d438c263be2
});

app.post('/createInvoice', (req, res) => {

    razorpayInstance.invoices.create({ ...req.body },
        (err, invoice) => {
           // console.log(invoice);
            //STEP 3 & 4: 
            if (!err)
                res.json(invoice)
            else
                res.send(err);
        }
    )

});

app.get('/getInvoice', (req, res) => {

    razorpayInstance.invoices.fetch(req.body.id,
        (err, invoice) => {
            //console.log(invoice);
            //STEP 3 & 4: 
            if (!err)
                res.json(invoice)
            else
                res.send(err);
        }
    )
});


app.get('/ping', (req, res) => {

    res.send("pong")
});
