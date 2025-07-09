import jwt from 'jsonwebtoken';

export const issueToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Enable secure for production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Allow cross-origin for production
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined // Set domain for production
  };

  console.log('🍪 Setting cookie with options:', cookieOptions);
  console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
  
  res.cookie('token', token, cookieOptions);
  console.log('✅ Cookie set successfully');
};
