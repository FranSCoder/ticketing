import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@fsticketingforcourse/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
