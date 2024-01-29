import mongoose from "mongoose";
import asyncHandler from "../middleware/async.js";
import Expenses from "../models/expenses.js";
import Incomes from "../models/incomes.js";


export const statistics = asyncHandler(async (req, res, next) => {
   const currentUserId = new mongoose.Types.ObjectId(req.user.id);
   const currentDate = new Date();
   const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
   const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
   // console.log("currentDate", currentDate)
   // console.log("startDate", startDate)
   // console.log("endDate", endDate)
   const expStats = await Expenses.aggregate([
      {
         $match: {
            userId: currentUserId,
            date: {
               $gte: startDate,
               $lte: endDate,
            }
         }
      },
      {
         $group: {
            _id: "$userId",
            totalExp: { $sum: "$amount" },
            recordsExp: { $sum: 1 }
         }
      }
   ])

   const incomeStats = await Incomes.aggregate([
      {
         $match: {
            userId: currentUserId,
            date: {
               $gte: startDate,
               $lte: endDate,
            }
         }
      },
      {
         $group: {
            _id: "$userId",
            totalIncome: { $sum: "$amount" },
            recordsExp: { $sum: 1 }
         }
      }
   ])
   console.log("expStats", expStats)
   res.status(200).json({ success: true, message: "Total expenses", expStats, incomeStats })
})