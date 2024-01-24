import mongoose, { Schema } from "mongoose";


const Incomes = new Schema({
   date: {
      type: String,
      required: [true, "Please enter the date"],
      trim: true
   },
   name: {
      type: String,
      required: [true, "Please enter the date"],
      trim: true
   },
   bank: {
      type: String,
      required: [false, "Mention the bank name if you transfer throught bank"],
      trim: true
   },
   amount: {
      type: String,
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

export default mongoose.model('Incomes', Incomes)
