const paymentSchema = new mongoose.Schema({
  user:           { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  course:         { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
  orderId:        { type: String, required: true, unique: true },
  transactionId:  { type: String },
  amount:         { type: Number, required: true },
  status:         { type: String, enum: ['pending','completed','failed'], default: 'pending' },
}, { timestamps: true });

export const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);