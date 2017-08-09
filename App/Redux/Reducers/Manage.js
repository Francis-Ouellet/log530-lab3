// @flow
import {Member} from '../../Models';

export function changingMemberStatus(state: Member[] = [], action: {type: Object, data: Object}): Member[] {
  switch (action.type) {
    case RECEIVED_RESPONSE:
      if (action.data.originAction && action.data.originAction === SEARCH) {
        return action.data.members;
      }
      return state;

    default:
      return state;
  }
}