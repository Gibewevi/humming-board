import { userModel } from '../models/userModel';
import { walletModel } from '../models/walletModel';

// Authentifie un utilisateur via Metamask.
const metamaskAuthentification = async (metamask_address) => {
  try {
    // Vérifie si l'utilisateur existe.
    const isUserExist = await userModel.isUserExist(metamask_address);
    if (isUserExist) {
      // Retourne les informations de l'utilisateur existant.
      const user_id = isUserExist;
      return { user_id: user_id, metamask_address: metamask_address };
    } else {
      // Crée un nouvel utilisateur et son wallet.
      const user_id = await userModel.insertUser(metamask_address);
      await walletModel.createWallet(user_id);
      // Retourne les informations du nouvel utilisateur.
      return { user_id: user_id, metamask_address: metamask_address };
    }
  } catch (error) {
    // Gère les erreurs.
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