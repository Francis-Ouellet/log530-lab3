// @flow
import Rx from 'rxjs';

import {fetchingFromServer, receivedResponse} from '.';
import {Member} from '../../Models';

const MEMBERS = require('./dummy_members.json');

export const SEARCH = 'SEARCH';

export function search(term: string) {
  return {
    type: SEARCH,
    term
  };
}

export function searchEpic(action: Object) {
  const delay = Math.random() * (1500 - 200) + 200;

  return action.ofType(SEARCH)
    .switchMap((action: Object) => {
      const members = MEMBERS
        .filter((member: Object) =>
          member.prenom.includes(action.term) ||
          member.nom.includes(action.term) ||
          member.nomUtilisateur.includes(action.term)
        )
        .map((member: Object) => new Member(member));

      return Rx.Observable.of(fetchingFromServer())
        .concat(
          Rx.Observable.of(receivedResponse({
            members,
            originAction: SEARCH
          }))
          .delay(delay)
        );
    });
}

