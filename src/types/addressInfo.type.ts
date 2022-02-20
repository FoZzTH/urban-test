import { AddressStatus } from './addressStatus.enum';
import { AddressStatusMessage } from './addressStatusMessage.enum';
import { LocationInfo } from './locationInfo.type';

export type AddressInfo = {
  status: AddressStatus;
  message?: AddressStatusMessage;
  location?: LocationInfo;
};
