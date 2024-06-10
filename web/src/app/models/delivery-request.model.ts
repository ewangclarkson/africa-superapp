import {Location} from "./location.model";
import {Status} from "../constants/status";

export interface DeliveryRequest {
  packageId: string | undefined,
  pickupTime: string | undefined,
  startTime: string | undefined,
  endTime: string | undefined,
  location: Location | undefined,
  status: Status | undefined
}
