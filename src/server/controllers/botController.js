import { botModel } from "../models/botModel";

const getOrdersByBotId = async(bot_id) => {
    return await botModel.getOrdersByBotId(bot_id);
}

const getBotsByUserID = async(user_id) => {
    const bots = await botModel.getBotsByUserId(user_id);
    return bots;
}

const getBotsOrdersByUserId = async(user_id) => {
    const bots = await getBotsByUserID(user_id);
    for(const bot of bots){
        bot.orders = await getOrdersByBotId(bot.id);
    }
    return bots;    
}

export const botController = {
    getBotsByUserID,
    getBotsOrdersByUserId,
    getOrdersByBotId
}