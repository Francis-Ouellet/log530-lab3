// @flow
import {Member} from '../../Models';
import {
  SEARCH,
  RECEIVED_RESPONSE,
  CLEAR_MEMBERS
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

export function showMember(state: Object = MEMBERS[1], action: any) : Member {
  return state;
}

export function editMember(newMember : Member) : Member {

}
