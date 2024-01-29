import mongoose, { Schema } from "mongoose";


const Expenses = new Schema({
   date: {
      type: Date,
      required: [true, "Please enter the date"],
      trim: true
   },
   name: {
      type: String,
      required: [true, "Please enter the date"],
      trim: true
   },
   category: {
      type: String,
      // enum: [
      //    "Health & Personal Care",
      //    "Transportation",
      //    "Home Services",
      //    "Electronics",
      //    "Households",
      //    "Furniture",
      //    "Clothing",
      //    "Wearables",
      //    "Jewellery",
      //    "Groceries",
      //    "Insurance",
      //    "Food",
      //    "Pets",
      //    "Gifts",
      //    "Others"
      // ],
      required: [true, "Mention the category"],
      trim: true
   },
   amount: {
      type: Number,
      required: [true, "Please enter the value of the item"],
      trim: true
   },
   payMethod: {
      type: String,
      required: [true, "Method of the payment"],
      enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash'],
      trim: true
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }
})

export default mongoose.model('Expenses', Expenses)