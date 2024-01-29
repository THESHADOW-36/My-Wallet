import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter the first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please enter the last name'],
        trim: true,
    },
    userName: {
        type: String,
        required: [true, 'Please enter the user name'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user'
    },
    dob: {
        type: String,
        required: [true, 'Please enter the name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email address'],
        trim: true,
        unique: true,
        match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        trim: true,
        minlength: [6, 'The password must be more than 6 character'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [false, 'Please provide a confirm password'],
        trim: true,
        minlength: [6, 'The password must be more than 6 character'],
        select: false
    },
    // resetPasswordToken: String,  //???????
    // restePasswordExpire: Date,   //???????
    createdAt: {
        type: Date,
        default: Date.now
    }
});
console.log("this.password : ", UserSchema.password)

// Encript password
UserSchema.pre('save', async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

// Encrypt edited password
// UserSchema.post('find', async function (next) {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
//     next();
// });
// UserSchema.methods.editPass = async function (next) {
//     const salt = await genSalt(10);
//     this.password = await hash(this.password, salt);
//     next();
// };

// Sign JWT and return
UserSchema.methods.getJWTWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRE
    });
}

// Match enter password and hash
UserSchema.methods.matchPassword = async function (enterPassword) {
    return await compare(enterPassword, this.password);
}


export default model('User', UserSchema);