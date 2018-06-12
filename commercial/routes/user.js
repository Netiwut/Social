const express = require('express')

const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../model/user')
const config = require('../config/database')



router.post('/register', (req, res, next) => {
    let newUser = new User(req.body)

    User.addUser(newUser, (err, count) => {
        if (count > 0) {
            res.json({
                success: false,
                msg: 'อีเมล์ถูกใช้งานไปแล้ว'
            })
        } else {
            res.json({
                success: true,
                msg: 'สมัครสมาชิกเสร็จสิ้น'
            })
        }
    })
})

router.post('/authenticate', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;

        console.log(user);

        if (!user) {
            return res.json({
                success: false,
                msg: 'Username ไม่ถูกต้อง'
            })
        }


        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                })

                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    user: {
                        id: user._id,
                        email: user.email,
                        username: user.username,
                        gender: user.gender,
                        birthdate: user.birthdate
                    }
                })
            } else {

            }

        })
    })
})

module.exports = router;