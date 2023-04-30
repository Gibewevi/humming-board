import {walletModel} from "../models/walletModel"
import { botController } from "./botController";

const getAssets = async(user_id) => {
    //récupère tous les assets disponibles dans le wallet (ETH,USDT,RLC,BTC)
        // liste des assets
    //récupère tous les bots
        // liste des bots
        
    const assets = await walletModel.getAssetsFromUserId(user_id);
    const bots = await botController.getBotsByUserID(user_id);
    const botsWithOrders = await botController.getOrdersByBotsId(bots);
    botsWithOrders.map((bot, key) => {
        if(key == 0){
            botController.getPLByBotId(bot);
        }
    });
    // récupère le P&L de tous les bots

    return assets;
}

export const walletController = {
    getAssets
}