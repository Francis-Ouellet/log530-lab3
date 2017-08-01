// @flow
import Rx from 'rxjs';
import {ajax} from 'rxjs/observable/dom/ajax';

import {fetchingFromServer, receivedResponse} from '.';
import {
  Member,
  Player,
  Editor,
  Card
} from '../../Models';
export const SEARCH = 'SEARCH';

export function search(term: string) {
  return {
    type: SEARCH,
    term
  };
}

function buildCard(card: Object){
  const player = new Player({
    nomEquipe: card.equipe,
    prenom: card.prenom,
    nom: card.nom,
    numero: card.numeroJoueur,
    position: card.position,
    estRecrue: card.estRecrue
  });
  const editor = new Editor({idEditeur: card.idEditeur, nom: card.editeur});
  return new Card({
    idFiche: card.idFiche,
    datePublication: card.datePublication,
    valeur: card.valeur,
    lienImageDevant: card.lienImageDevant,
    lienImageDerriere: card.lienImageDerriere,
    annee: card.annee,
    etat: card.etat
  }, editor, player);
}

export function searchEpic(action: Object) {
  let membersObservable;
  let cardsObservable;

  return action.ofType(SEARCH)
    .switchMap((action: Object) => {
      const searchObservable = ajax.getJSON('https://hp4yqks7n9.execute-api.us-east-2.amazonaws.com/Prod/search?name="' + action.term + '"');
      membersObservable = searchObservable.map((response: Object) => {
        return receivedResponse({members: response.members.map((m: Object) => new Member(m)), originAction: SEARCH});
      });
      cardsObservable = searchObservable.map((response: Object ) => {
        return receivedResponse({cards: response.players.map((card: Object) => buildCard(card)), originAction: SEARCH});
      });

      return Rx.Observable.of(fetchingFromServer()).concat(membersObservable).concat(cardsObservable);
    });
}

