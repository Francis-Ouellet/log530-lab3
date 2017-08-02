// @flow
import {Member} from '../../Models';
import {
  SEARCH,
  RECEIVED_RESPONSE,
  CLEAR_MEMBERS,
  LOGIN, LOGOUT,
  UPDATING_USER_PROFIL
} from '../Actions';

export function members(state: Member[] = [], action: {type: Object, data: Object}): Member[] {
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
  switch (action.type) {
    case RECEIVED_RESPONSE:
      if (action.data.originAction && action.data.originAction === LOGIN) {
        return action.data.member;
      }

    case LOGOUT:
      return null;

    default:
      return state;
  }
}

export function updateCurrentMember(state: Member, action: Object): Member {
  switch (action.type) {

  }
}
