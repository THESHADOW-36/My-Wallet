import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "./async.js";


export const protecter = asyncHandler(async (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
   }
   console.log("token : ", token)
   if (!token) {
      return next(new ErrorResponse('Token is not found!', 401));
   }
   try {
      const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY);
      console.log("decode : ", decode);

      req.user = await User.findById(decode.id);
      console.log("req.user : ", req.user);
      next();
   } catch (error) {
      return next(new ErrorResponse('You dont have aceess to this request', 401));
   }
})

export const authenticate = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return next(new ErrorResponse(`You dont have access to this route with user role ${req.user.role}`, 403));
      }
      next();
   }
};