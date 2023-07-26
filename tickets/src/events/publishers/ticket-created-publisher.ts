import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@fsticketingforcourse/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
