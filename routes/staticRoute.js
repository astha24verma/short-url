const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");
const { checkForAuthentication, restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get('/admin/urls', restrictTo(['Admin']), async (req, res) => {
    const allUrls = await URL.find({});
    const allUsers = await User.find({});
    res.render('home', { urls: allUrls, isAdmin: true, users: allUsers, user: req.user });
});

router.get('/', restrictTo(['Normal', 'Admin']), async (req, res) => {
    const allUrlsOfThisUser = await URL.find({ createdBy: req.user._id });
    res.render('home', { urls: allUrlsOfThisUser, isAdmin: false, user: req.user });

});

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/login', (req, res) => {
    return res.render('login');
});

router.get('/stats', checkForAuthentication, async (req, res) => {
    return res.render('stats', { user: req.user });
});

// router.get('/url/analytics/:shortId', async (req, res) => {
//     return res.render('stats', { user: req.user });
// });

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
});




module.exports = router;