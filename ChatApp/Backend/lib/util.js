const jwt = require('jsonwebtoken');


const generateToken = (userId, res) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
  
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',

  });
}