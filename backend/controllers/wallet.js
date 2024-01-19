import asyncHandler from "../middleware/async.js"
import Expenses from "../models/expenses.js";

// .../api/v1/wallet/expenses
export const addExpenses = asyncHandler(async (req, res, next) => {
   const { date, name, category, amount, payMethod } = req.body;
   // if (!date || !name || !category || !amount || !payMethod) return next(new ErrorResponse('All fields are mandatory'))
   console.log(date, name, category, amount, payMethod)

   const expData = await Expenses.create({ userId: req.user, date, name, category, amount, payMethod })

   sendTokenResponse(expData, 200, res);
})

// .../api/v1/wallet/get-exp
export const getExpenses = asyncHandler(async (req, res, next) => {
   const { id } = req.user;

   const allExp = await Expenses.find({ userId: id })

   sendTokenResponse(allExp, 200, res);
})

// .../api/v1/wallet/income
export const addIncome = asyncHandler(async (req, res, next) => {

})

export const sendTokenResponse = (data, status, res) => {
   const token = data

   res.status(200).json({ success: true, token });
}