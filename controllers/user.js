const User = require('../models/user');
// const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');

async function handleUserSignup(req, res) {

    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/login');

}

async function handleUserLogin(req, res) {

    console.log('Login request received:', req.body);

    const { email, password } = req.body;

    const user = await User.matchPassword(email, password);

    // const user = await User.findOne({
    //     email,
    //     password,
    // });
    if (!user) {
        return res.render('login', { error: "Invalid email or password" });
    }

    // const sessionId = uuidv4();
    // setUser(sessionId, user);
    const token = setUser(user);
    // console.log(token);
    res.cookie('token', token);
    console.log('User authenticated, token set in cookie');
    return res.redirect('/');
    // return res.json({ token });
}


module.exports = {
    handleUserSignup, handleUserLogin
};