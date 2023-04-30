import pool from './model';

const createWallet = async (user_id) => {
  let client;
  try {
    client = await pool.connect();
    await client.query('BEGIN');
    const req = 'INSERT INTO wallets (user_id) VALUES($1)';
    const value = [user_id];
    await client.query(req, value);
    await client.query('COMMIT');
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

const insertAssetsInWallet = async (user_id, assets) => {
  let client;
  try {
    client = await pool.connect();

    // Insérer tous les assets en une seule requête avec une jointure et la clause UNNEST
    const query = `
    INSERT INTO wallet_assets (wallet_id, asset, amount)
    SELECT w.id, a.asset, 1000
    FROM wallets w, UNNEST($2::TEXT[]) as a(asset)
    WHERE w.user_id = $1
    ON CONFLICT (wallet_id, asset) DO UPDATE SET
      amount = wallet_assets.amount + EXCLUDED.amount
  `;

    await client.query(query, [user_id, assets]);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

const getAssetsFromUserId = async (user_id) => {
  let client;
  try {
    client = await pool.connect();
    const req = `
      SELECT wa.asset
      FROM wallet_assets wa
      JOIN wallets w ON wa.wallet_id = w.id
      WHERE w.user_id = $1
    `;
    const res = await client.query(req, [user_id]);
    return res.rows;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
}

export const walletModel = {
  createWallet,
  insertAssetsInWallet,
  getAssetsFromUserId
};