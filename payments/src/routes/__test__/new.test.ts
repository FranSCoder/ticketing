import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Order } from "../../models/order";
import { OrderStatus } from "@fsticketingforcourse/common";
import { stripe } from "../../stripe";
import { Payment } from "../../models/payment";

it("retorna 404 al intentar comprar una orden que no existe", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({
      token: "asdfasfd",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("retorna 401 al intentar comprar una orden que no pertenece al usuario", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({
      token: "asdfasfd",
      orderId: order.id,
    })
    .expect(401);
});

it("retorna 400 al intentar comprar una orden cancelada", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", signin(userId))
    .send({
      orderId: order.id,
      token: "asdlkfj",
    })
    .expect(400);
});

// El siguiente test está comentado para evitar llenar mi cuenta Stripe de pagos

// it("retorna 201 con inputs válidos", async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();
//   const price = Math.floor(Math.random() * 100000);
//   const order = Order.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     userId,
//     version: 0,
//     price,
//     status: OrderStatus.Created,
//   });
//   await order.save();

//   await request(app)
//     .post("/api/payments")
//     .set("Cookie", signin(userId))
//     .send({
//       token: "tok_visa",
//       orderId: order.id,
//     })
//     .expect(201);

//   const stripeCharges = await stripe.charges.list({ limit: 50 });
//   const stripeCharge = stripeCharges.data.find((charge) => {
//     return charge.amount === price * 100;
//   });

//   expect(stripeCharge).toBeDefined();
//   expect(stripeCharge!.currency).toBe("eur");

//   const payment = await Payment.findOne({
//     orderId: order.id,
//     stripeId: stripeCharge!.id,
//   });
//   expect(payment).not.toBeNull();
// });
