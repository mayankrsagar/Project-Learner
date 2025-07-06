const challengeSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  starterCode: { type: String },      // what pre-populates the editor
  testCode:    { type: String },      // to verify correctness
}, { timestamps: true });

const submissionSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  challenge:   { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
  code:        { type: String },
  passed:      { type: Boolean },
  submittedAt: { type: Date, default: Date.now },
});

export const Challenge  = mongoose.models.Challenge  || mongoose.model('Challenge', challengeSchema);
export const Submission = mongoose.models.Submission || mongoose.model('Submission', submissionSchema);
