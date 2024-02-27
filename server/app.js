const express = require('express');
var cors = require('cors')
const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

//Router
const test = require('./Router/test');
const matchdataRouter = require('./Router/matchdata');
const datatableRouter = require('./Router/datatable');
// const predictionRouter = require('./Router/prediction');

//Using Router
app.use('/', test);
app.use('/matchdata', matchdataRouter);
app.use('/datatable', datatableRouter);
// app.use('/prediction', predictionRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});