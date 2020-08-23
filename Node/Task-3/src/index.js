require('dotenv').config();
const express = require('express');

const apiRoutes = require('./api.routes');
const errorMiddleware = require('./middlewares/errors.middleware');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);
app.use(
  errorMiddleware.errorHandler,
  errorMiddleware.pageNotFound
);

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`listening to http://${process.env.HOST}:${process.env.PORT}`)
})
