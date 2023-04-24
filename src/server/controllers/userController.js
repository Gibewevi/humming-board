import { userModel } from '../models/userModel';

const getAllUsers = async () => {
    try {
      const result = await userModel.getAllUsers();
      return result;
    } catch (error) {
      console.error('Failed to get all users in userController:', error);
      throw error;
    }
  };

export const userController = {
    getAllUsers
}