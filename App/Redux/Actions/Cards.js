// @flow
import Rx from 'rxjs';

import {ajax} from 'rxjs/observable/dom/ajax';

import {
  Card,
  Player,
  Editor
} from '../../Models';
import {
  fetchingFromServer,
  receivedResponse
} from '.';

export const GET_CARDS_BY_CATEGORY = 'GET_CARDS_BY_CATEGORY';

export function getCardsByCategory(category: string) {
  return {
    type: GET_CARDS_BY_CATEGORY,
    category
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

export function getCardsByCategoryEpic(action: Object) {
  return action.ofType(GET_CARDS_BY_CATEGORY)
    .mergeMap((action: Object) => {
      const category = action.category.toUpperCase();
      const categoryObservable = ajax.getJSON('https://hp4yqks7n9.execute-api.us-east-2.amazonaws.com/Prod/fiches?category=' + action.category.toLowerCase())
        .map((response: Object) => {
          return receivedResponse({
            cards: response.map((card: Object) => buildCard(card)).slice(0, 50),
            category,
            originAction: GET_CARDS_BY_CATEGORY
          });
      });

      return Rx.Observable.of(fetchingFromServer())
        .concat(
          categoryObservable
        );
    });
}
