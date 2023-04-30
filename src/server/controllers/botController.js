import { botModel } from "../models/botModel";
import { walletModel } from '../models/walletModel';
import csv from 'csv-parser';
import { Readable } from 'stream';

const getUserIdFromRequest = (req) => {
    return parseInt(req.headers.user_id);
  }
  
  const getOrdersFromCSV = (req) => {
    return new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => {
        const fileContent = Buffer.concat(chunks).toString('utf-8');
  
        // Transforme le contenu du fichier CSV en un tableau d'objets JavaScript
        const trades = [];
        const stream = Readable.from(fileContent);
        stream
          .pipe(csv())
          .on('data', (data) => {
            trades.push(data);
          })
          .on('end', () => {
            // Supprime le premier objet du tableau (les en-têtes)
            trades.shift();
  
            // Renomme les clés avec les noms souhaités
            const tradesRenamedKeys = trades.map((trade) => {
              delete Object.assign(trade, { exchange_trade_id: trade._0 })._0;
              delete Object.assign(trade, { config_file_path: trade._1 })._1;
              delete Object.assign(trade, { strategy: trade._2 })._2;
              delete Object.assign(trade, { market: trade._3 })._3;
              delete Object.assign(trade, { symbol: trade._4 })._4;
              delete Object.assign(trade, { base_asset: trade._5 })._5;
              delete Object.assign(trade, { quote_asset: trade._6 })._6;
              delete Object.assign(trade, { timestamp: trade._7 })._7;
              delete Object.assign(trade, { order_id: trade._8 })._8;
              delete Object.assign(trade, { trade_type: trade._9 })._9;
              delete Object.assign(trade, { order_type: trade._10 })._10;
              delete Object.assign(trade, { price: trade._11 })._11;
              delete Object.assign(trade, { amount: trade._12 })._12;
              delete Object.assign(trade, { leverage: trade._13 })._13;
              delete Object.assign(trade, { trade_fee: trade._14 })._14;
              delete Object.assign(trade, { position: trade._15 })._15;
              delete Object.assign(trade, { age: trade._16 })._16;
              return trade;
            });
  
            resolve(tradesRenamedKeys);
          });
      });
    });
  }
  
  const createBot = async(user_id, orders) => {
    return await botModel.insertBot(user_id, orders[0]);
  }
  
  const getAssetsFromBotId = async(bot_id) => {
  return await botModel.getAssetsFromBotId(bot_id);
  }
  
  const createBotWithCSV = async (req, res) => {
    const user_id = getUserIdFromRequest(req);
    const orders = await getOrdersFromCSV(req);
    const bot_id = await createBot(user_id, orders);
    const assets = await getAssetsFromBotId(bot_id);
    
    await walletModel.insertAssetsInWallet(user_id, assets);
    await botModel.insertOrders(orders, bot_id);
  }
  
const getOrdersByBotsId = async(bots) => {
  return await botModel.getOrdersbyBotsId(bots);
}
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

const getBasePLByBot = (bot) => {
  const base_amount = parseInt(bot.base_amount);
  let current_amount = parseInt(base_amount);
  let pnl = 0;
  let pnlPercent = 0;

  bot.orders.map((order, key) => {
    if(order.trade_type == 'SELL'){
      const orderAmount = parseFloat(order.amount).toFixed(2);
      const orderPrice = parseInt(order.price).toFixed(2);
      current_amount += (order.amount)*(order.price);
      console.log('--------------------')
      console.log('base_amount : ', base_amount)
      console.log('current_amount : ', current_amount)
      console.log('orderAmount : ', orderAmount)
      console.log('orderPrice : ', orderPrice)
      console.log('--------------------')
    }

    pnl = current_amount - base_amount;
    pnlPercent = ((current_amount - base_amount) / base_amount)*100;
    console.log('pnl : ', pnl)
    console.log('pnlPercent : ', pnlPercent)
    return [base_amount, current_amount, pnl, pnlPercent];
  })

}
const getPLByBotId = (bot) => {
 // test avec le base pnl
  const pnl = getBasePLByBot(bot);
  console.log(pnl);
}

export const botController = {
    getBotsByUserID,
    getBotsOrdersByUserId,
    getOrdersByBotId,
    getOrdersByBotsId,
    getUserIdFromRequest,
    getOrdersFromCSV,
    createBot,
    getAssetsFromBotId,
    createBotWithCSV,
    getPLByBotId
}