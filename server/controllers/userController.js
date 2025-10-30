import User from '../models/User.js';

/**
 * This function is not an API endpoint.
 * It's a helper function that our booking controller will use.
 * It finds a user by email, or creates them if they don't exist.
 */
export const findOrCreateUser = async (email, fullName, phone) => {
  // 1. Find the user by their email
  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    // 2. If we found them, return the user
    return user;
  } else {
    // 3. If not, create a new user
    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      phone,
    });
    // 4. Save the new user and return them
    await newUser.save();
    return newUser;
  }
};