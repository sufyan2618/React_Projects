const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv')
dotenv.config();

const authRouter = require('./routes/auth.router');
app.use('/auth', authRouter);

const messageRouter = require('./routes/message.router');
app.use('/message', messageRouter);

app.use(express.json());

const PORT = process.env.PORT; 




let connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString)
  .then(() => {
    console.log(`Connected To: ${connectionString}`);
  })
  .catch((err) => {
    console.log(err.message);
  });


app.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
});
