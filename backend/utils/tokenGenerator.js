import jwt from 'jsonwebtoken';

export const issueToken = (res, user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    path: '/',                    
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
