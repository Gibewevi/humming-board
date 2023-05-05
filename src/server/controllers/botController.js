import { botModel } from "../models/botModel";
import { walletModel } from "../models/walletModel";
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
        .pipe(csv({ headers: false }))
        .on('data', (data) => {
          trades.push(data);
        })
        .on('end', () => {
          // Supprime le premier objet du tableau (les en-têtes)
          trades.shift();
          // Renomme les clés avec les noms souhaités
          const tradesRenamedKeys = trades.map((trade) => {
            delete Object.assign(trade, { exchange_trade_id: trade['0'] })['0'];
            delete Object.assign(trade, { config_file_path: trade['1'] })['1'];
            delete Object.assign(trade, { strategy: trade['2'] })['2'];
            delete Object.assign(trade, { market: trade['3'] })['3'];
            delete Object.assign(trade, { symbol: trade['4'] })['4'];
            delete Object.assign(trade, { base_asset: trade['5'] })['5'];
            delete Object.assign(trade, { quote_asset: trade['6'] })['6'];
            delete Object.assign(trade, { timestamp: trade['7'] })['7'];
            delete Object.assign(trade, { order_id: trade['8'] })['8'];
            delete Object.assign(trade, { trade_type: trade['9'] })['9'];
            delete Object.assign(trade, { order_type: trade['10'] })['10'];
            delete Object.assign(trade, { price: trade['11'] })['11'];
            delete Object.assign(trade, { amount: trade['12'] })['12'];
            delete Object.assign(trade, { leverage: trade['13'] })['13'];
            delete Object.assign(trade, { trade_fee: trade['14'] })['14'];
            delete Object.assign(trade, { position: trade['15'] })['15'];
            delete Object.assign(trade, { age: trade['16'] })['16'];
            return trade;
          });


          resolve(tradesRenamedKeys);
        });
    });
  });
};


const createBot = async (user_id, orders) => {
  return await botModel.insertBot(user_id, orders[0]);
}

const getAssetsFromBotId = async (bot_id) => {
  return await botModel.getAssetsFromBotId(bot_id);
}

const createBotWithCSV = async (req, res) => {

  const user_id = getUserIdFromRequest(req);
  const orders = await getOrdersFromCSV(req);
  const bot_id = await createBot(user_id, orders);
  const assets = await getAssetsFromBotId(bot_id);
  await walletModel.insertAssetsInWallet(user_id, assets);
  await botModel.insertOrders(orders, bot_id);
  console.log('Le bot est bien transmis');
}

const getOrdersByBotsId = async (bots) => {
  return await botModel.getOrdersbyBotsId(bots);
}
const getOrdersByBotId = async (bot_id) => {
  return await botModel.getOrdersByBotId(bot_id);
}

const getBotsByUserID = async (user_id) => {
  const bots = await botModel.getBotsByUserId(user_id);
  return bots;
}

const getBotsOrdersByUserId = async (user_id) => {
  const bots = await getBotsByUserID(user_id);
  for (const bot of bots) {
    bot.orders = await getOrdersByBotId(bot.id);
  }
  return bots;
}

const getBasePNLByBot = (bot) => {
  let base_amount = parseInt(bot.base_amount);
  let current_amount = base_amount;
  let pnl = 0;
  let pnlPercent = 0;

  bot.orders.forEach((order, key) => {
    if (order.trade_type === 'SELL') {
      const orderAmount = parseFloat(order.amount);
      current_amount -=  orderAmount;
    } else if (order.trade_type === 'BUY') {
      const orderAmount = parseFloat(order.amount);
      current_amount += orderAmount; 
    }
  });
  pnl = (current_amount - base_amount);
  pnlPercent = (pnl / base_amount) * 100;
  return {current_amount : current_amount.toFixed(2), pnl : pnl.toFixed(2), pnlPercent : pnlPercent.toFixed(2)};
};

const getQuotePNLByBot = (bot) => {
  let quote_amount = parseInt(bot.quote_amount);
  let current_amount = quote_amount;
  let pnl = 0;
  let pnlPercent = 0;

  bot.orders.forEach((order, key) => {
    if (order.trade_type === 'BUY') {
      const orderAmount = parseFloat(order.amount);
      const orderPrice = parseFloat(order.price);
      current_amount -= (orderAmount*orderPrice);
    } else if (order.trade_type === 'SELL') {
      const orderAmount = parseFloat(order.amount);
      const orderPrice = parseFloat(order.price);
      current_amount += (orderAmount*orderPrice);  
    }
  });
  pnl = (current_amount - quote_amount);
  pnlPercent = (pnl / quote_amount) * 100;
  return {current_amount : current_amount.toFixed(2), pnl : pnl.toFixed(2), pnlPercent : pnlPercent.toFixed(2)};
};

const addPNLByBotId = (bot) => {
  // test avec le base pnl
  bot.pnl = { base: getBasePNLByBot(bot), quote: getQuotePNLByBot(bot) };
  return bot;
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
  addPNLByBotId
}