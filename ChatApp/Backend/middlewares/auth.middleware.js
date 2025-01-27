const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ error: "Unauthorized" });

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId);
        if(!user) return res.status(401).json({ error: "Unauthorized" });

        req.user = user;
        next();
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = auth;