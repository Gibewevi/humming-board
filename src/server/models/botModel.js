import pool from './model';

const insertBot = async (user_id, orders) => {
    let client;
    const base_amount = 1000;
    const quote_amount = 1000;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'INSERT INTO bots (user_id, strategy, market, symbol, base_asset, quote_asset, config_file_path, base_amount, quote_amount, shared) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
        const values = [
            user_id,
            orders.strategy,
            orders.market,
            orders.symbol,
            orders.base_asset,
            orders.quote_asset,
            orders.config_file_path,
            base_amount,
            quote_amount,
            false
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

        for (let i = 0; i < trades.length; i++) {
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
    } catch (error) {

    } finally {
        client.release();
    }
}

const getOrdersbyBotsId = async(bots) => {
    let client;
    let botsResult = bots;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'SELECT * FROM orders WHERE bot_id = $1';
        for(const bot of bots){
            const value = [bot.id];
            const res = await client.query(req, value);
            bot.orders = res.rows;
        }
        return botsResult;
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}


const getOrdersByBotId = async(bot_id) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'SELECT * FROM orders WHERE bot_id = $1';
        const value = [
            bot_id
        ]
        const res = await client.query(req, value);
        return res.rows ;
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}


const getAssetsFromBotId = async (bot_id) => {
    let client;
    try {
        client = await pool.connect();
        const req = await client.query('SELECT base_asset, quote_asset FROM bots WHERE id = $1', [bot_id]);
        const base_asset = req.rows[0].base_asset;
        const quote_asset = req.rows[0].quote_asset;
        return [base_asset, quote_asset];
    } catch (error) {
        console.error(error);
        throw new Error('Erreur lors de la récupération des assets du bot_id');
    } finally {
        if (client) {
            client.release();
        }
    }
  }

const getBotsByUserId = async (user_id) => {
    const bots = [];
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'SELECT * FROM bots WHERE user_id = $1';
        const value = [user_id];
        const res = await client.query(req, value);
        const bots = res.rows;
        return bots ;
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
    }
}

export const botModel = {
    getBotsByUserId,
    getOrdersByBotId,
    getOrdersbyBotsId,
    getAssetsFromBotId,
    insertBot,
    insertOrders,
}