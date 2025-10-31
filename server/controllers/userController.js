import User from '../models/User.js';


export const findOrCreateUser = async (email, fullName, phone) => {
  let user = await User.findOne({ email: email });

  if (user) {
    return user;
  } else {
    const newUser = new User({
      fullName,
      email: email,
      phone,
    });
    await newUser.save();
    return newUser;
  }
};