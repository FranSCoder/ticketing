import { requireAuth } from "@fsticketingforcourse/common";
import express, { Request, Response } from "express";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  const order = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(order);
});

export { router as indexOrderRouter };
