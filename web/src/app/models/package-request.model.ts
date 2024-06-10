import {Location} from "./location.model";

export interface PackageRequest {
  description: string | undefined,
  weight: number  | undefined,
  width: number  | undefined,
  height: number  | undefined,
  depth: number  | undefined,
  fromName: string  | undefined,
  fromAddress: string | undefined,
  fromLocation: Location | undefined,
  toName: string | undefined,
  toAddress: string | undefined,
  toLocation: Location  | undefined
}
