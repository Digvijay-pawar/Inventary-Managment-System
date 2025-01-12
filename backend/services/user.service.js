const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const User = require('../models/User');

exports.createToken = async (id) => {
    return await jsonwebtoken.sign({ id }, JWT_TOKEN, { expiresIn: '1d' });
};

exports.verifyToken = async (token) => {
    return await jsonwebtoken.verify(token, JWT_TOKEN);
}

exports.findUserByEmail = async (email) => {
    return User.findOne({ email });
};

exports.hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

exports.comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

exports.findUserById = async (id) => {
    return User.findById(id);
};