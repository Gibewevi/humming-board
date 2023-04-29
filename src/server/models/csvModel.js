import pool from './model';

const getAssetsFromBot_id = async (bot_id) => {
    let client;
    try {
      client = await pool.connect();
  
      const req = await client.query('SELECT base_asset, quote_asset FROM bots WHERE id = $1', [bot_id]);
      const base_asset = req.rows[0].base_asset;
      const quote_asset = req.rows[0].quote_asset;
      return [ base_asset, quote_asset ];
    } catch (error) {
      console.error(error);
      throw new Error('Erreur lors de la récupération des assets du bot_id');
    } finally {
      if (client) {
        client.release();
      }
    }
  }
  
const insertAssetsInWallet = async(user_id, assets) => {
    console.log('model assets : ', assets)
    let client;
    try {
        client = await pool.connect();
        const wallet = await client.query('SELECT id FROM wallets WHERE user_id = $1',[user_id]);
        if (wallet.rows.length === 0 ){
            throw new Error('Aucun wallet trouvé pour cet utilisateur.');
        }  
       const wallet_id = wallet.rows[0].id;

       // Parcourir les assets et les insérer.
       for(const asset of assets){
        await client.query('INSERT INTO wallet_assets (wallet_id, asset, amount) VALUES ($1,$2,1000) ON CONFLICT (wallet_id, asset) DO NOTHING', [wallet_id, asset]);
        console.log('Les assets sont bien ajoutés dans le wallet');
       }

    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

const insertBot = async(user_id, orders) => {
    console.log('user_id in model : ', user_id);
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'INSERT INTO bots (user_id, strategy, market, symbol, base_asset, quote_asset, config_file_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
        const values = [
            user_id,
            orders.strategy,
            orders.market,         
            orders.symbol,         
            orders.base_asset,         
            orders.quote_asset,         
            orders.config_file_path,         
        ];
        const result = await client.query(req, values);
        const bot_id = result.rows[0].id;
        await client.query('COMMIT');
        return bot_id;
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

const insertOrders = async (trades, bot_id) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'INSERT INTO orders (bot_id, timestamp, trade_type, order_type, price, amount, leverage) VALUES ($1, $2, $3, $4, $5, $6, $7)';

        for (let i=0; i<trades.length;i++){
            const values = [
                bot_id,
                trades[i].timestamp, 
                trades[i].trade_type,
                trades[i].order_type, 
                trades[i].price, 
                trades[i].amount, 
                trades[i].leverage
        ]
        await client.query(req, values);
        };
        await client.query('COMMIT');
    } catch(error) {

    } finally {
        client.release();
    }
}

export const csvModel = {
    insertBot, 
    insertOrders,
    getAssetsFromBot_id,
    insertAssetsInWallet
}