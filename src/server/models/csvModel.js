import Model from './model';
import pool from './model';

const insertTrades = async (trades) => {
    let client;
    let botID = 1;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        const req = 'INSERT INTO trades (bot_id, exchange_trade_id, config_file_path, strategy, market, symbol) VALUES ($1, $2, $3, $4, $5, $6)';
        for (const trade of trades) {
            const values = [
                botID,
                trade.exchange_trade_id,
                trade.config_file_path,
                trade.strategy,
                trade.market,
                trade.symbol,
            ];
            await client.query(req, values);
        }

        await client.query('COMMIT');
        console.log('Vous avez insérer ${trades.length} dans la base de donnée');
    } catch (error){
        console.error(error);
    } finally {
        client.release();
    }
}

export const csvModel = {
    insertTrades
}