import User from '../models/User.js';

export const create =async(userData)=>{
    const { fullName, email, password, role } = userData;
    const newUser = new User({
        // username: email.split('@')[0], // Simple username generation
        email,
        password, // Ensure to hash this before saving in production
        role,
        fullName,
    });
    return newUser.save();
}

// Email is unique, so we can use it to find a user Faster with FindOne
export const findByEmail = (email) => {
    return User.findOne ({ email }).exec();
}   

export const findUserById = (id) => {
    return User.findById(id).exec();
}

export const updateById = (id, updateData) => {
    return User.findByIdAndUpdate   (id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is run on the update
    }).exec();  
}
export const deleteById = (id) => {
    return User.findByIdAndDelete(id).exec();
};

export const fetchAllUsers = () => {
    return User.find({}).exec();
};