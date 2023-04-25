import pool from './model';


const insertBot = async(trades) => {
    let client;
    let user_id = 1; 
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'INSERT INTO bots (user_id, strategy, market, symbol, base_asset, quote_asset, config_file_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
        const values = [
            user_id,
            trades.strategy,
            trades.market,         
            trades.symbol,         
            trades.base_asset,         
            trades.quote_asset,         
            trades.config_file_path,         
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
    insertOrders
}