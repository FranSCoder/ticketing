import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@fsticketingforcourse/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
