import {Location} from "./location.model";

export interface PackageResponse {
  packageId: string
  activeDeliveryId: string,
  description: string,
  weight: number,
  width: number,
  height: number,
  depth: number,
  fromName: string,
  fromAddress: string,
  fromLocation: Location,
  toName: string,
  toAddress: string,
  toLocation: Location
}
