// @flow
import Rx from 'rxjs';

import {fetchingFromServer, receivedResponse} from '.';
import {Member} from '../../Models';

const MEMBERS = require('./dummy_members.json');

export const MANAGE = 'MANAGE';

export function changingMemberStatus(status: Boolean) {
  return {
    type: MANAGE,
    status
  };
}

