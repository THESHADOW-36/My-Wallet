import asyncHandler from "../middleware/async.js";
import Incomes from "../models/incomes.js";
import ErrorResponse from "../utils/errorResponse.js";

export const addIncomes = asyncHandler(async (req, res, next) => {
   const { date, name, bank, amount, payMethod } = req.body;

   const incomeData = await Incomes.create({ userId: req.user, date, name, bank, amount, payMethod })

   sendIncomeResponse(incomeData, 200, res)
})

export const getIncomes = asyncHandler(async (req, res, next) => {
   const query = { userId: req.user }
   const { date, name, bank, amount, payMethod, skip, limit } = req.query;

   if (!skip) return next(new ErrorResponse('Pagination skip is not found', 401))
   if (!limit) return next(new ErrorResponse('Pagination limit is not found', 401))

   if (date) {
      query['date'] = date;
   }
   if (name) {
      query['name'] = name;
   }
   if (bank) {
      query['bank'] = bank;
   }
   if (amount) {
      query['amount'] = amount;
   }
   if (payMethod) {
      query['payMethod'] = payMethod;
   }

   const allIncome = await Incomes.find(query).skip(skip).limit(limit).select("-userId -__v")

   sendIncomeResponse(allIncome, 200, res)
})

export const getSingleIncome = asyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const singleIncome = await Incomes.findById(id).select("-userId -__v");

   sendIncomeResponse(singleIncome, 200, res);
})

export const editIncome = asyncHandler(async (req, res, next) => {
   const { date, name, bank, amount, payMethod } = req.body;
   const { id } = req.params;

   const incomeData = await Incomes.findByIdAndUpdate(id, { userId: req.user, date, name, bank, amount, payMethod }, { new: true }).select("-userId -__v");

   sendIncomeResponse(incomeData, 200, res);
})

export const deleteIncome = asyncHandler(async (req, res, next) => {
   const { id } = req.params;

   const deleteIncome = await Incomes.findByIdAndDelete(id)
   if (!deleteIncome) return res.status(404).json({ success: false, message: "Item Id is not found" })

   sendIncomeResponse(deleteIncome, 200, res);
})

export const sendIncomeResponse = (data, status, res) => {
   res.status(status).json({ success: true, data });
}