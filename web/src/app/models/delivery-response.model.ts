import {Location} from "./location.model";
import {Status} from "../constants/status";

export interface DeliveryResponse {
  deliveryId: string,
  packageId: string,
  pickupTime: string,
  startTime: string,
  endTime: string,
  location: Location,
  status: Status
}
