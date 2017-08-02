// @flow
import Rx from 'rxjs';

import {receivedResponse, receivedError} from '.';
import {Member} from '../../Models';

const MEMBERS = require('./dummy_members.json');

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login(usernameOrEmail: string, password: string) {
  return {
    type: LOGIN,
    username: usernameOrEmail,
    password
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function loginEpic(action: Object) {
  return action.ofType(LOGIN)
    .switchMap((action: Object) => {
      const message = 'Incorrect username/email or password.';
      let memberObj = MEMBERS.find((member: Object) => member.nomUtilisateur === action.username);

      if (!memberObj) {
        memberObj = MEMBERS.find((member: Object) => member.courriel === action.username);
      }

      if (!memberObj) {
        return Rx.Observable.of(receivedError(message));
      }

      if (memberObj.motDePasse !== action.password) {
        return Rx.Observable.of(receivedError(message));
      }

      const member = new Member(memberObj);
      return Rx.Observable.of(receivedResponse({
        member,
        originAction: LOGIN
      }));
    });
}
