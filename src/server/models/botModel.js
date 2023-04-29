import pool from './model';

const getWalletAssets = async(user_id) => {
    let client;
    try {
        client = await pool.connect();
        const req = 'SELECT '
    } catch(error){
        console.error(error);
    } finally{
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
    getOrdersByBotId
}