const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get('/admin/urls', restrictTo(['Admin']), async(req, res) => {
    const allUrls = await URL.find({});
    const allUsers = await User.find({});
    res.render('home', {urls : allUrls, isAdmin: true, users: allUsers});
});

router.get('/', restrictTo(['Normal', 'Admin']) ,async(req, res) =>{
    const allUrlsOfThisUser = await URL.find({createdBy: req.user._id});
    res.render('home', {urls : allUrlsOfThisUser, isAdmin: false});
});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/login', (req, res)=>{
    return res.render('login');
})


module.exports = router;