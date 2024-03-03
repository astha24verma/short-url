// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken');
const secret = "astha$#24@dev";

function setUser(user) {
    // sessionIdToUserMap.set(id, user);
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, secret);

}

function getUser(token) {
    if(!token) return null; 
    // return sessionIdToUserMap.get(id);
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;       
    }
}

module.exports = {
    setUser, getUser
}
