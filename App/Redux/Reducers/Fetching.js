// @flow
import {
  FETCHING_FROM_SERVER,
  RECEIVED_ERROR,
  RECEIVED_RESPONSE
} from '../Actions';

export function isFetching(state: boolean = false, action: {type: string}): boolean {
  switch(state) {
    case FETCHING_FROM_SERVER:
      return true;

    case RECEIVED_RESPONSE:
    case RECEIVED_ERROR:
      return false;

    default:
      return state;
  }
}
