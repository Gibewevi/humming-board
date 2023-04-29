import { botController } from '@/server/controllers/botController';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    botController.createBotWithCSV(req);
  //  res.status(200).json({ response: 'CSV parse' });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
