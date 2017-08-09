// @flow
import Rx from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';

import {receivedResponse, receivedError} from '.';
import {Member} from '../../Models';

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
      const url = "https://hp4yqks7n9.execute-api.us-east-2.amazonaws.com/Prod/login";
      const body = JSON.stringify({email: action.username, username: action.username, password: action.password});
      return ajax.post(url, body)
        .catch(error => Rx.Observable.of(receivedError(message)))
        .map(xhr => {
          if(xhr.response){
            const responseObject = xhr.response;
            const user = responseObject.user;
            user.token = responseObject.token;
            return receivedResponse({member: new Member(user), originAction: LOGIN});
          }
          else return receivedError(message);
      });
    });
}

export function subscribeEpic(action: Object) {
  return action.ofType(SUBSCRIBE)
    .switchMap((action: Object) => {
      const url = "https://hp4yqks7n9.execute-api.us-east-2.amazonaws.com/Prod/members";
      const message = "Erreur lors de la création du compte";
      // Add member to system
      // initialize new Member
      const body = JSON.stringify({
        prenom: action.firstName,
        nom: action.lastName,
        courriel: action.email,
        nomUtilisateur: action.username,
        motDePasse: action.password
      });

      return ajax.post(url, body)
        .catch(error => Rx.Observable.of(receivedError(message)))
        .map(xhr => {
          if(xhr.response){
            return receivedResponse({member: new Member(xhr.response), originAction: SUBSCRIBE});
          }
          else return receivedError(message);
        });
    });
}
