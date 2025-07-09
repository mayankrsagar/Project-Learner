import {
  create,
  deleteById,
  fetchAllUsers,
  findByEmail,
  findUserById,
  updateById,
} from '../services/userServices.js';
import { issueToken } from '../utils/tokenGenerator.js';

export const registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    const existingUser = await findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = await create({ fullName, email, password, role });
    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update login timestamp and save (before sending the response)
    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false }); // Skip validation in case password is untouched

    // Issue token
    console.log('🔑 Issuing token for user:', user.email);
    issueToken(res, user);
    console.log('🍪 Token cookie should be set now');

    // Send sanitized response
    const { password: _, ...safeUser } = user.toObject(); // remove password, retain others
    res.status(200).json({ message: 'Login successful', user: safeUser });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  });
  res.status(200).json({ message: 'Logout successful' });
}

export const getUserProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.id);// req.user is getting populated because of middleware
    if (!user) {    
      return res.status(404).json({ message: 'User not found' });
    }   
    const userObj = user.toObject();
delete userObj.password;
res.status(200).json({ message: 'User profile fetched successfully', user: userObj });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  } 
}

export const updateUserProfileByAdmin = async (req, res) => {
  const { fullName, currentProfession, preferredJobLocation } = req.body;

  try {
    const updatedUser = await updateById(req.user.id, {
      fullName,
      currentProfession,
      preferredJobLocation,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude sensitive information
    updatedUser.password = undefined; // Remove password from response and don't send it back to the client
    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user profile', error: error.message });
  }
};

export const userUpdatingDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    //Validate if the user is trying to update their own profile 
    //will update later

    const updatedUser = await updateById(id, {
      ...updatedData,
      // lastUpdatedAt: new Date(),
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    updatedUser.password = undefined;

    res.status(200).json({ message: 'User details updated successfully', user: updatedUser });

  } catch (error) {
    res.status(500).json({ message: 'Failed to update user details', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const deletedUser = await deleteById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }   
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });

  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

export const adminFetchUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

//Will be used by admin to update user details 
//Work in progress
export const adminUpdateUser = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  const updateData = req.body;

  try {
    const updatedUser = await updateById(id, updateData);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    updatedUser.password = undefined; // Remove password from response
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};