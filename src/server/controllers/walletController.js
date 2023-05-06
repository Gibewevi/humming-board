import { CleanPlugin } from "webpack";
import { botModel } from "../models/botModel";
import { walletModel } from "../models/walletModel"
import { botController } from "./botController";

const getWallet = async (user_id) => {
    // recupere les bots avec PNL
    let bots = await botModel.getBotsAndOrders(user_id);
    const assets = getAssetsByBots(bots);
    const wallet = newWallet(assets, bots);
    return wallet;
};

const getAssetsByBots = (bots) => {
    const assets = []
    bots.map((bot, key) => {
        if (!assets.includes(bot.base_asset)) {
            assets.push(bot.base_asset)
        };
        if (!assets.includes(bot.quote_asset)) {
            assets.push(bot.quote_asset)
        };
    });
    return assets;
}

const newWallet = (assets, bots) => {
    let wallet = [];
    assets.map((asset, key) => {
        const walletAsset = createAsset(asset);
        wallet.push(walletAsset);
    });
    wallet = updateAssetsWallet(wallet, bots);
    return wallet;
}

const createAsset = (pair) => {
    const asset = {
        pair: pair,
        startAmount: 0,
        currentAmount: 0,
        pnl: 0,
        pnlPercent: 0,
        bots: []
    }
    return asset;
}

const updateAssetsWallet = (wallet, bots) => {
    wallet.map((asset) => {
        bots.forEach((bot) => {
            let localBot, assetType;

            if (asset.pair == bot.base_asset) {
                assetType = 'base';
            } else if (asset.pair == bot.quote_asset) {
                assetType = 'quote';
            } else {
                return; // Si aucune correspondance n'est trouvée, passez au bot suivant
            }

            localBot = createLocalBot(bot, assetType);
            asset.bots.push(localBot);
            asset.startAmount += parseFloat(localBot.pnl.startAmount);
            asset.currentAmount = (parseFloat(localBot.pnl.startAmount) + (parseFloat(localBot.pnl.currentAmount) - parseFloat(localBot.pnl.startAmount))).toFixed(2);
            asset.pnl = (asset.currentAmount - asset.startAmount).toFixed(2);
            asset.pnlPercent = ((asset.pnl / asset.startAmount) * 100).toFixed(2);
        });
    });
    return wallet;
};

const createLocalBot = (bot, assetType,) => {
    let localBot = {
        id: bot.id,
        user_id: bot.user_id,
        asset: bot[`${assetType}_asset`],
        pnl: getPNLByBot(bot, assetType)
    }
    return localBot;
}


const getPNLByBot = (bot, assetType) => {
    let pnl = botController.addPNLByBotId(bot, assetType);
    return pnl;
};


export const walletController = {
    getWallet
}