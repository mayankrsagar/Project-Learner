const blogPostSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  slug:        { type: String, required: true, unique: true },
  content:     { type: String, required: true },      // MDX string
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tags:        [String],
  published:   { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
