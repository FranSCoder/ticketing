import mongoose from "mongoose";
import { TicketCreatedEvent } from "@fsticketingforcourse/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // crear una instancia del listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // crear un evento con fake data
  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "rage against the machine",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  // crear un objeto fake message
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("crea y guarda un ticket", async () => {
  const { listener, data, msg } = await setup();

  // llama a la función onMessage con el objeto fake data + objeto message
  await listener.onMessage(data, msg);

  // crear aserciones para asegurarnos de que el ticket fue creado!
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("reconoce el mensaje", async () => {
  const { data, listener, msg } = await setup();
  // llama a la función onMessage con el objeto fake data + objeto message
  await listener.onMessage(data, msg);
  // crear aserciones para asegurarnos de que la función de reconocimiento ack es llamada
  expect(msg.ack).toHaveBeenCalled();
});
