import { botController } from "@/server/controllers/botController";

export default async function handler(req, res) {
    const user_id = parseInt(req.query.user_id);
    const bots = await botController.getBotsOrdersByUserId(user_id);
    res.status(200).json({ bots });
  }
  