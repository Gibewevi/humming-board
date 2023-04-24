import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
  try {
    const users = await userController.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get all users:", error);
    res.status(500).json({ error: "Failed to get all users" });
  }
}
