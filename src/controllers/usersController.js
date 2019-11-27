const User = require('../models/User');

const signUp = async (req, res, next) => {
    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
}; 

const signIn = (req, res, next) => {

};

const getUser = (req, res, next) => {

};

module.exports = {
    signUp,
    signIn,
    getUser
}