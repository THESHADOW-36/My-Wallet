import asyncHandler from "../middleware/async.js";
import Incomes from "../models/incomes.js";

export const addIncomes = asyncHandler(async (req, res, next) => {
   const { date, name, bank, amount, payMethod } = req.body;

   const incomeData = await Incomes.create({ userId: req.user, date, name, bank, amount, payMethod })

   sendIncomeResponse(incomeData, 200, res)
})

export const getIncomes = asyncHandler(async (req, res, next) => {
   sendIncomeResponse('Get Incomes', 200, res)
})

export const editIncome = asyncHandler(async (req, res, next) => {
   sendIncomeResponse('Edit Income', 200, res)
})

export const deleteIncome = asyncHandler(async (req, res, next) => {
   sendIncomeResponse('Delete Income', 200, res)
})

export const sendIncomeResponse = (data, status, res) => {
   res.status(status).json({ success: true, data });
}