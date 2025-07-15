import jwt from 'jsonwebtoken';

export const issueToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

   const cookieOptions = {
    httpOnly: true,
    secure: true,       // 👈 must be true for SameSite=None
    sameSite: 'None',   // 👈 allow cross-site fetches
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    // domain: '.onrender.com', // optional, host-only is fine
  };

  console.log('🍪 Setting cookie with options:', cookieOptions);
  console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
  
  res.cookie('token', token, cookieOptions);
  console.log('✅ Cookie set successfully');
};
