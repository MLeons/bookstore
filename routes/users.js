const express = require('express');
const bcrypt = require('bcrypt');
const isEmpty = require('lodash/isEmpty');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

let User = require('../models/user');
let router = express.Router();

router.get('/:username', (req, res) => {
    let username = req.params.username;
    User.getUserByName(username, (err, user) => {
        if (err) {
            res.json({ msg: err, user: user })
        } else {
            if (user)
                res.json({ msg: 'User registered', user: user })
            else
                res.json({ msg: 'User not found', user: user })
        }
    });
});

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const password_digest = bcrypt.hashSync(password, 10);
    let newUser = new User({
        username: username,
        email: email,
        password: password_digest
    })
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' })
        } else {
            res.json({ success: true, msg: 'User registered' })
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByName(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ user }, config.secret, { expiresIn: 604800 });
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        })
    });
});

module.exports = router;
