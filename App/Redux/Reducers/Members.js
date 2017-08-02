// @flow
import {Member} from '../../Models';
import {
  SEARCH,
  RECEIVED_RESPONSE,
  CLEAR_MEMBERS,
  LOGIN, LOGOUT, SUBSCRIBE
} from '../Actions';

export function members(state: Member[] = [], action: {type: Object, data: Object}): Member[] {
  console.warn(JSON.stringify(action));
  switch (action.type) {
    case RECEIVED_RESPONSE:
      if (action.data.originAction && action.data.originAction === SEARCH && action.data.members) {
        return action.data.members;
      }
      return state;

    case CLEAR_MEMBERS:
      return [];

    default:
      return state;
  }
}

export function currentMember(state: ?Member = null, action: Object): ?Member {
  console.warn(JSON.stringify(action));

  switch (action.type) {
    case RECEIVED_RESPONSE:
      if (action.data.originAction && action.data.originAction === LOGIN) {
        return action.data.member;
      } else if (action.data.originAction && action.data.originAction === SUBSCRIBE) {
        return action.data.member;
      }
      return state;

    case LOGOUT:
      return null;

    default:
      return state;
  }
}
