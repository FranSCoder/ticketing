import {
  PaymentCreatedEvent,
  Publisher,
  Subjects,
} from "@fsticketingforcourse/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
