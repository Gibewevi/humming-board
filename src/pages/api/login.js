import { userController } from "@/server/controllers/userController";

export default async function handler(req, res) {
  const metamask_address = req.query.metamask_address;
  await userController.metamaskAuthentification(metamask_address);
    // res.status(200).json( metamask_address );
  }
  