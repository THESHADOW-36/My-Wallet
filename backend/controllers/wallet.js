import asyncHandler from "../middleware/async.js"
import Expenses from "../models/expenses.js";


export const addExpenses = asyncHandler(async (req, res, next) => {
   const { date, name, category, amount, payMethod } = req.body;
   // if (!date || !name || !category || !amount || !payMethod) return next(new ErrorResponse('All fields are mandatory'))
   console.log(date, name, category, amount, payMethod)

   const expData = await Expenses.create({ userId, date, name, category, amount, payMethod })

   sendTokenResponse(expData, 200, res);
})

export const addIncome = asyncHandler(async (req, res, next) => {

})

export const sendTokenResponse = (data, status, res) => {
   const token = data


   res.status(200).json({ success: true, token });
}