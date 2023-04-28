import { csvModel } from '../models/csvModel';
import csv from 'csv-parser';
import { Readable } from 'stream';


const createBotWithCSV = async(req,res) => {
    const trades = await parseCSV(req);
    console.log('trades : ', trades);
    const bot_id = await csvModel.insertBot(trades[0]);
    console.log('le bot est bien inséré dans la base de donnée');
    await csvModel.insertOrders(trades, bot_id);
    console.log('les ordres sont bien insérés dans la base de donnée');
}

const parseCSV = (req) => {
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
};



export const csvController = {
  parseCSV,
  createBotWithCSV
}