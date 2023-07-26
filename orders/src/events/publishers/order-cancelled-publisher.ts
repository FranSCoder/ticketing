import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from "@fsticketingforcourse/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
