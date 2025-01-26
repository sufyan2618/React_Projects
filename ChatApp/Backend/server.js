const express = require('express');
const app = express();


const authRouter = require('./routes/auth.router');
app.use('/auth', authRouter);

app.use(express.json());

app.listen(4000, () => {
  console.log('Server is running on http://localhost:3000');
});