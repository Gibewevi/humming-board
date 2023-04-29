import {walletModel} from "../models/walletModel"

const getAssets = async(user_id) => {
    const assets = await walletModel.getAssetsFromUserId(user_id);
    return assets;
}

export const walletController = {
    getAssets
}