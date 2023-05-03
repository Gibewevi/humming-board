import model from './model';
import pool from './model';

const insertUser = async (metamask_address) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    const req = 'INSERT INTO users (metamask_address) VALUES($1) RETURNING id';
    const value = [metamask_address];
    const res = await client.query(req, value);
    const userId = res.rows[0].id;
    await client.query('COMMIT'); // Ajoutez cette ligne pour confirmer la transaction
    return userId;
  } catch (error) {
    console.error(error);
  } finally {
    client.release(); // Ajoutez 'await' ici
  }
}

const isUserExist = async (metamask_address) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    const req = 'SELECT id FROM users WHERE metamask_address = $1';
    const value = [metamask_address];
    const res = await client.query(req, value);
    if(res.rows.length > 0){
      return res.rows[0].id;
    } else return false;
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}


const getAllUsers = async () => {
  try {
    const result = await model.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Failed to get users in userModel:', error);
    throw error;
  }
};

export const userModel = {
  getAllUsers,
  isUserExist,
  insertUser,
};
