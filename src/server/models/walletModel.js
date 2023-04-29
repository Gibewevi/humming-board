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
console.log('wallet model : ', user_id)
console.log('wallet model : ', assets)
  try {
    client = await pool.connect();

    // Insérer tous les assets en une seule requête avec une jointure et la clause UNNEST
    const query = `
        INSERT INTO wallet_assets (wallet_id, asset, amount)
        SELECT w.id, a.asset, 1000
        FROM wallets w, UNNEST($2::TEXT[]) as a(asset)
        WHERE w.user_id = $1
        ON CONFLICT (wallet_id, asset) DO NOTHING
      `;

    await client.query(query, [user_id, assets]);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

const getAssetsFromUser_id = async (user_id) => {
  let client;
  try {
      client = await pool.connect();
      const req = `
      SELECT wa.asset, wa.amount
      FROM wallet_assets wa
      JOIN wallet w ON wa.wallet_id = w.id
      WHERE w.user_id = $1
    `;
      const res = client.query(req, [user_id]);
      console.log('assets : ', res.rows);
      return await res.rows;
  } catch (error) {

  } finally {

  }
}

export const walletModel = {
  createWallet,
  insertAssetsInWallet,
  getAssetsFromUser_id
}