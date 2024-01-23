import asyncHandler from "../middleware/async.js"
import Expenses from "../models/expenses.js";
import ErrorResponse from "../utils/errorResponse.js";

// .../api/v1/wallet/expenses
export const addExpenses = asyncHandler(async (req, res, next) => {
   const { date, name, category, amount, payMethod } = req.body;
   // if (!date || !name || !category || !amount || !payMethod) return next(new ErrorResponse('All fields are mandatory'))
   console.log(date, name, category, amount, payMethod)

   const expData = await Expenses.create({ userId: req.user, date, name, category, amount, payMethod })

   sendTokenResponse(expData, 200, res);
})

// .../api/v1/wallet/expenses
export const getExpenses = asyncHandler(async (req, res, next) => {
   const query = { userId: req.user }
   const { date, name, category, amount, payMethod, skipPg, limitPg } = req.query;

   console.log('skipPg - ', skipPg)
   console.log('limitPg - ', limitPg)
   if (!skipPg) return next(new ErrorResponse('Pagination skip is not found', 401))
   if (!limitPg) return next(new ErrorResponse('Pagination limit is not found', 401))

   if (date) {
      query['date'] = date;
   }
   if (name) {
      query['name'] = name;
   }
   if (category) {
      query['category'] = category;
   }
   if (amount) {
      query['amount'] = amount;
   }
   if (payMethod) {
      query['payMethod'] = payMethod;
   }
   // console.log('req - ', req);
   console.log('req.user - ', req.user.id)
   console.log('query - ', query)

   const allExp = await Expenses.find(query).skip(skipPg).limit(limitPg);


   sendTokenResponse(allExp, 200, res);
})

export const editExpense = asyncHandler(async (req, res, next) => {
   const { date, name, category, amount, payMethod } = req.body;
   const { id } = req.params;
   console.log('req - ', req)
   console.log('id - ', id)

   const expData = await Expenses.findByIdAndUpdate(id, { userId: req.user, date, name, category, amount, payMethod }, { new: true });

   sendTokenResponse(expData, 200, res);
})

export const deleteExpense = asyncHandler(async (req, res, next) => {
   const { id } = req.params;
   console.log('id - ', id)

   const expData = await Expenses.findByIdAndDelete(id);
   if (!expData) return res.status(404).json({ success: false, message: "Item Id is not found" })

   sendTokenResponse(expData, 200, res);
})

export const sendTokenResponse = (data, status, res) => {
   // const token = data

   res.status(200).json({ success: true, data });
}