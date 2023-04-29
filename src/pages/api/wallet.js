import { walletController } from "@/server/controllers/walletController";

export default async function handler(req, res) {
    const user_id = parseInt(req.query.user_id);
  try {
    const wallet = await walletController.getAssets(user_id);
    res.status(200).json(wallet);
  } catch (error) {
    console.error("Failed to get wallet assets:", error);
    res.status(500).json({ error: "Failed to get wallet assets" });
  }
}
