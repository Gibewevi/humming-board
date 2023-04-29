import { userModel } from '../models/userModel';

const metamaskAuthentification = async (metamask_address) => {
  try {
    const isUserExist = await userModel.isUserExist(metamask_address);
    if (isUserExist) {
      console.log('L\'utilisateur existe déjà');
      const user_id = isUserExist;
      return {user_id : user_id, metamask_address : metamask_address};
    } else {
      console.log('Création de l\'utilisateur');
      const user_id = await userModel.insertUser(metamask_address);
      console.log('Création du wallet de l\'utilisateur');
      await userModel.createWallet(user_id);
      return {user_id : user_id, metamask_address : metamask_address};
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