const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { error } = require('console');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Normal', 'Admin'],
        required: true,
        default: 'Normal',

    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update(this.password).digest('hex');
    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static("matchPassword", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) return null;
    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedHash) return null;

    return user;

});


// model
const User = mongoose.model('user', userSchema);

module.exports = User;