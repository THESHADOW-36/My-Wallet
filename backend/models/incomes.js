import mongoose, { Schema } from "mongoose";


const Incomes = new Schema({
   date: {
      type: Date,
      required: [true, "Please enter the date"],
      trim: true
   },
   name: {
      type: String,
      required: [true, "Please enter the Name"],
      trim: true
   },
   bank: {
      type: String,
      required: [false, "Mention the bank name if you transfer throught bank"],
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
      enum: ['Transfered', 'Cheque', 'UPI', 'Cash', 'Bank'],
      trim: true
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   }
})

export default mongoose.model('Incomes', Incomes)
