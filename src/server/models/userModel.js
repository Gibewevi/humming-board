import model  from './model';

const getAllUsers = async () => {
  try {
    console.log('userModel getAllUsers');
    const result = await model.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Failed to get users in userModel:', error);
    throw error;
  }
};

export const userModel = {
  getAllUsers,
};
