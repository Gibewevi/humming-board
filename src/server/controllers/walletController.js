import { walletModel } from "../models/walletModel"
import { botController } from "./botController";

const sortWalletByPairsAndAssets = (assets, bots) => {
    const wallet = [];
    assets.forEach((pair, key) => {
        const asset = {
            pair: pair,
            start_amount: 0,
            current_amount: 0,
            PNL: null,
            PNLPercent: null, // Ajouté "null" comme valeur initiale pour éviter les erreurs de syntaxe
            bots: []
        };

        for (const bot of bots) {
            let localBot;
            if (bot.base_asset == pair) {
                localBot = {
                    id: bot.id,
                    user_id: bot.user_id,
                    asset: bot.base_asset,
                    amount: parseInt(bot.base_amount),
                    currentAmount: parseInt(bot.baseCurrentAmount),
                    PNL: bot.basePNL,
                    PNLPercent: bot.basePNLPercent,
                };
                asset.start_amount += localBot.amount; // Remplacé "amount" par "localBot.amount"
                asset.current_amount += localBot.amount + (localBot.currentAmount - localBot.amount); // Remplacé "amount" et "currentAmount" par leurs équivalents dans "localBot"
                asset.PNL = (asset.current_amount - asset.start_amount);
                asset.PNLPercent = ((asset.PNL / asset.start_amount) * 100).toFixed(2);
                asset.bots.push(localBot);
            } else if (bot.quote_asset == pair) {
                localBot = {
                    id: bot.id,
                    user_id: bot.user_id,
                    asset: bot.quote_asset,
                    amount: parseInt(bot.quote_amount),
                    currentAmount: parseInt(bot.quoteCurrentAmount),
                    PNL: bot.quotePNL,
                    PNLPercent: bot.quotePNLPercent,
                };
                asset.start_amount += localBot.amount; // Remplacé "amount" par "localBot.amount"
                asset.current_amount += localBot.amount + (localBot.currentAmount - localBot.amount); // Remplacé "amount" et "currentAmount" par leurs équivalents dans "localBot"
                asset.PNL = asset.current_amount - asset.start_amount;
                asset.PNLPercent = ((asset.PNL / asset.start_amount) * 100).toFixed(2); // Remplacé "asset.amount" par "asset.start_amount"
                asset.bots.push(localBot);
            }
        }
        wallet.push(asset);
    });
    return wallet;
};


const getAssets = async (user_id) => {
    // récupère les pairs
    const assets = await walletModel.getAssetsFromUserId(user_id);
    // récupère les bots
    const bots = await botController.getBotsByUserID(user_id);
    // avec les ordres
    const botsWithOrders = await botController.getOrdersByBotsId(bots);
    const botsArray = []
    botsWithOrders.forEach((bot, key) => {
        const PNL = botController.getPNLByBotId(bot);
        let localBot = {
            id: bot.id,
            user_id: bot.user_id,
            base_asset: bot.base_asset,
            quote_asset: bot.quote_asset,
            base_amount: bot.base_amount,
            quote_amount: bot.quote_amount,
            baseCurrentAmount: PNL.base[0],
            quoteCurrentAmount: PNL.quote[0],
            basePNL: PNL.base[1],
            quotePNL: PNL.quote[1],
            basePNLPercent: PNL.base[2],
            quotePNLPercent: PNL.quote[2],
        };
        botsArray.push(localBot);
    });
    const wallet = sortWalletByPairsAndAssets(assets, botsArray);
    return wallet;
};


export const walletController = {
    getAssets
}