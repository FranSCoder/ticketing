import { Ticket } from "../ticket";

it("implementa control optimista de concurrencia", async () => {
  // Crear una instancia de un ticket
  const ticket = Ticket.build({
    title: "concierto",
    price: 5,
    userId: "123",
  });

  // Guardar el ticket en la base de datos
  await ticket.save();

  // Recupera el ticket dos veces
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Hacer dos cambios independientes a los tickets que recuperamos
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Guardar el primer ticket que recuperamos
  await firstInstance!.save();

  // Guardar el segundo ticket que recuperamos y esperar un error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("No debería alcanzar este punto");
});

it("incrementa el número de la versión al guardar varias veces", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
