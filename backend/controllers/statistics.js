import mongoose from "mongoose";
import asyncHandler from "../middleware/async.js";
import Expenses from "../models/expenses.js";
import Incomes from "../models/incomes.js";
import User from "../models/User.js";


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

// post 
export const addTransaction = asyncHandler(async (req, res, next) => {

   const { firstName, lastName, userName, role, dob, email, password } = req.body;

   const session = await mongoose.startSession();
   session.startTransaction();

   try {

      const transData = await User.create([{ firstName, lastName, userName, role, dob, email, password }], { session })

      await session.commitTransaction();

      return res.status(200).json({ success: true, message: "Transaction Successful", transData });

   } catch (error) {

      await session.abortTransaction();

      return res.status(500).json({ success: false, message: "Transaction failed" });

   } finally {
      session.endSession();
   }
})

// get 
export const getTransaction = asyncHandler(async (req, res, next) => {
   const { firstName } = req.body;
   console.log("firstName :", firstName)

   const session = await mongoose.startSession();
   session.startTransaction();

   try {

      const getTransData = await User.findOne({ firstName }).session(session).select("-__v -createdAt");

      if (!getTransData) throw new Error("User is not found")

      await session.commitTransaction();

      return res.status(200).json({ success: true, message: "Transaction Successful....", getTransData });

   } catch (error) {

      await session.abortTransaction();

      return res.status(500).json({ success: false, message: error.message })

   } finally {
      session.endSession();
   }
})

// delete 
export const deleteTransaction = asyncHandler(async (req, res, next) => {
   const { userId, incomeId, expId } = req.query;
   console.log("Initial...")

   const session = await mongoose.startSession();
   session.startTransaction();

   try {

      const user = await User.findById({ _id: userId }).session(session)

      if (!user) throw new Error("User is not found")

      {// const incomes = await Incomes.findById({ _id: incomeId }).session(session)
         // if (!incomes) throw new Error("Incomes is not found")
         // const expenses = await Expenses.findById({ _id: expId }).session(session)
         // if (!expenses) throw new Error("Expenses is not found")
         // if (expenses.userId != userId) throw new Error("Expense's UserId is not Identical")
         // if (incomes.userId != userId) throw new Error("Income's UserId is not Identical")
      }

      await User.deleteMany({ _id: userId }, { session })

      await Incomes.deleteMany({ userId: userId }, { session })

      await Expenses.deleteMany({ userId: userId }, { session })

      console.log("Expenses deleted successfully")

      await session.commitTransaction();

      return res.status(200).json({ success: true, message: "deleted Successfully" })

   } catch (error) {

      await session.abortTransaction();

      return res.status(500).json({ success: false, message: error.message })

   } finally {
      session.endSession();
   }
})

// put
export const editTransaction = asyncHandler(async (req, res, next) => {
   const { currentUserId } = req.query; // jakie
   const { userId1, amt } = req.body; // dinesh

   if (!currentUserId) return res.status(404).json({ success: false, message: "currentUserId is not found" })
   if (!userId1) return res.status(404).json({ success: false, message: "Userid field is required" })
   if (!amt) return res.status(404).json({ success: false, message: "Amount field is required" })

   const session = await mongoose.startSession();

   session.startTransaction();


   try {

      const user1 = await Incomes.findById({ _id: currentUserId }).session(session)

      const user2 = await Incomes.findById({ _id: userId1 }).session(session)

      if (!user1) throw new Error("User1 is not found")

      if (!user2) throw new Error("User2 is not found")

      await Incomes.findOneAndUpdate({ _id: currentUserId }, { $inc: { amount: -amt } }, { session });

      await Incomes.findOneAndUpdate({ _id: userId1 }, { $inc: { amount: amt } }, { session });

      await session.commitTransaction();

      console.log('Transaction successfully committed.');

      return res.status(200).json({ success: true, message: "Transaction successfully committed" })

   } catch (error) {

      await session.abortTransaction();

      console.error('Error in transaction:', error);

      return res.status(500).json({ success: false, message: error.message });

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
