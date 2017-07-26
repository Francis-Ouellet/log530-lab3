// @flow

export const FETCHING_FROM_SERVER = 'FETCHING_FROM_SERVER';
export const RECEIVED_RESPONSE = 'RECEIVED_RESPONSE';
export const RECEIVED_ERROR = 'RECEIVED_ERROR';

export function fetchingFromServer(): {type: string} {
  return {
    type: FETCHING_FROM_SERVER
  };
}

export function receivedResponse(data: any): {type: string, data: Object} {
  return {
    type: RECEIVED_RESPONSE,
    data
  };
}

export function receivedError(message: string): {type: string, message: string} {
  return {
    type: RECEIVED_ERROR,
    message
  };
}
