import { genSalt, hash } from "bcrypt";
import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";


// .../api/v1/auth/register
export const register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, userName, dob, email, password } = req.body;

    const user = await User.create({
        firstName,
        lastName,
        userName,
        dob,
        email,
        password
    });

    sendTokenResponse(user, 200, res);
});

// .../api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorResponse(`User not found with email ${email}`, 401));
        //The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid password', 401));
    }
    
    sendTokenResponse(user, 200, res);
});

// .../api/v1/auth/current-user
export const getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-_id -createdAt -__v");
    // const currentUser = user.select("-_id -userId -__v");
    // console.log("currentUser : ", currentUser)

    res.status(200).json({ success: true, data: user });
});

export const editProfile = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, userName, dob, email } = req.body;
    // const salt = await genSalt(10);
    // const editedPass = await hash(password, salt);
    const editUser = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, userName, dob, email }, { new: true }).select("-_id -role -createdAt -__v");

    res.status(200).json({ success: true, data: editUser });
})


// Genrate JWT web token and cookies and send to res
const sendTokenResponse = (user, status, res) => {
    const token = user.getJWTWebToken();

    console.log('Date.now : ', Date.now());
    console.log('process.env.JWT_COOKIE_EXPIRE : ', process.env.JWT_COOKIE_EXPIRE);
    console.log('expire time : ', new Date(Date.now() + '30d'));

    const option = {
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        option.secure = true
    }

    res.status(status).cookie('token', token, option).json({ success: true, token });
}