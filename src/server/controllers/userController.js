import { userModel } from '../models/userModel';

const metamaskAuthentification = async (metamask_address) => {
  try {
    const isUserExist = await userModel.isUserExist(metamask_address);
    if (isUserExist) {
      console.log('l\'utilisateur existe déjà.');
      return true;
    } else {
      console.log('création de l\'utilisateur');
      const user_id = await userModel.insertUser(metamask_address);
      console.log('création du wallet de l\'utilisateur');
      await userModel.createWallet(user_id);
    }
  } catch (error) {
    console.error(error);
  }
}

const insertUser = async (metamask_address) => {
  try {
    await userModel.insertUser(metamask_address);
  } catch (error) {
    console.error(error);
  }
}

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
  getAllUsers,
  metamaskAuthentification
}