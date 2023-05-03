import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
  const metamask_address = req.query.metamask_address;
  const user = await userController.metamaskAuthentification(metamask_address);
    res.status(200).json( user );
  }
  