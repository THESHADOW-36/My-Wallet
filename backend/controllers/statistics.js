import mongoose from "mongoose";
import asyncHandler from "../middleware/async.js";
import Expenses from "../models/expenses.js";
import Incomes from "../models/incomes.js";


export const statistics = asyncHandler(async (req, res, next) => {
   const currentUserId = new mongoose.Types.ObjectId(req.user.id);
   const currentDate = new Date();
   const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
   const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
   // console.log("currentDate", currentDate)
   // console.log("startDate", startDate)
   // console.log("endDate", endDate)

   const incomeStats = await Incomes.aggregate([
      {
         $match: {
            userId: currentUserId,
            // date: {
            //    $gte: startDate,
            //    $lte: endDate,
            // }
         }
      },
      {
         $group: {
            _id: null,
            totalIncome: { $sum: "$amount" },
            recordsIncome: { $sum: 1 }
         }
      }
   ])

   const expStats = await Expenses.aggregate([
      {
         $match: {
            userId: currentUserId,
            // date: {
            //    $gte: startDate,
            //    $lte: endDate,
            // }
         }
      },
      {
         $group: {
            _id: null,
            totalExp: { $sum: "$amount" },
            recordsExp: { $sum: 1 }
         }
      }
   ])

   const totalIncomeStats = incomeStats.length > 0 ? incomeStats[0].totalIncome : 0;
   
   const totalExpStats = expStats.length > 0 ? expStats[0].totalExp : 0;

   const balStats = totalIncomeStats - totalExpStats;

   res.status(200).json({ success: true, message: "Total expenses", incomeStats, expStats, balStats })
})

// put
export const transaction = asyncHandler(async (req, res, next) => {
   const { userId1, amt } = req.body; // dinesh
   const { currentUserId } = req.query; // jakie

   if (!currentUserId) return res.status(404).json({ success: false, message: "currentUserId is not found" })
   if (!userId1) return res.status(404).json({ success: false, message: "Userid field is required" })
   if (!amt) return res.status(404).json({ success: false, message: "Amount field is required" })

   const session = await mongoose.startSession();

   session.startTransaction();

   try {

      await Incomes.updateOne({ _id: currentUserId }, { $inc: { amount: -amt } }, { session });

      await Incomes.updateOne({ _id: userId1 }, { $inc: { amount: amt } }, { session });

      await session.commitTransaction();

      console.log('Transaction successfully committed.');

      return res.status(200).json({ success: true, message: "Transaction successfully committed" })

   } catch (error) {

      await session.abortTransaction();

      console.error('Error in transaction:', error);

      return res.status(500).json({ success: false, message: "Transaction failed" });

   } finally {

      session.endSession();

      // mongoose.connection.close();

   }
})



// In summary, this code snippet demonstrates the lifecycle of a MongoDB session with a transaction:

// Start Session: Create a new session.

// Start Transaction: Begin a transaction within the session.

// Commit Transaction: If all operations within the transaction are successful, commit the changes to the database.


// Abort Transaction: If there's an error or you decide to cancel the transaction, roll back the changes.

// End Session: Close the session to release resources.

// This structure ensures atomicity, consistency, isolation, and durability (ACID properties) for a set of database operations. Keep in mind that in a real-world scenario, you would perform your actual database operations between starting and ending the transaction.




// In the broader context of MongoDB update operators:

// $inc: Increments the value of the field by the specified amount.

// $set: Sets the value of the field to the specified value.

// $unset: Removes the specified field from the document.

// $push: Adds an element to an array.

// $pull: Removes an element from an array.
