// @flow
import Rx from 'rxjs';

import {receivedResponse, receivedError} from '.';
import {Member} from '../../Models';

const MEMBERS = require('./dummy_members.json');

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SUBSCRIBE = 'SUBSCRIBE';

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

export function subscribe(
  firstName: string,
  lastName: string,
  city: string,
  postalCode: string,
  email: string,
  username: string,
  password: string
) {
  return {
    type: SUBSCRIBE,
    firstName,
    lastName,
    city,
    postalCode,
    email,
    username,
    password
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

export function subscribeEpic(action: Object) {
  return action.ofType(SUBSCRIBE)
    .switchMap((action: Object) => {
      // Add member to system
      // initialize new Member
      const member = new Member({
        prenom: action.firstName,
        npm: action.lastName,
        ville: action.city,
        codePostal: action.postalCode,
        courriel: action.email,
        nomUtilisateur: action.username,
        motDePasse: action.password
      });
      return Rx.Observable.of(receivedResponse({
        member,
        originAction: SUBSCRIBE
      }));
    });
}
