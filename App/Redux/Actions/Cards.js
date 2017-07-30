// @flow
import Rx from 'rxjs';

import {
  Card,
  Player,
  Editor
} from '../../Models';
import {
  fetchingFromServer,
  receivedResponse
} from '.';

const COLLECTIONS = require('./dummy_collections.json');
const EDITORS = require('./dummy_editors.json');
const PLAYERS = require('./dummy_players.json');
const SEASONS = require('./dummy_seasons.json');
const TEAMS = require('./dummy_teams.json');
const CARDS = require('./dummy_cards.json');

export const GET_CARDS_BY_CATEGORY = 'GET_CARDS_BY_CATEGORY';

export function getCardsByCategory(category: string) {
  return {
    type: GET_CARDS_BY_CATEGORY,
    category
  };
}

export function getCardsByCategoryEpic(action: Object) {
  const delay = Math.random() * (1500 - 200) + 200;

  return action.ofType(GET_CARDS_BY_CATEGORY)
    .mergeMap((action: Object) => {
      const category = action.category.toUpperCase();
      let cards: Card[] = [];

      COLLECTIONS
        .filter((collectionObj: Object) => collectionObj.type === category)
        .forEach((collectionObj: Object) => {
          const cardsList: Card[] = CARDS
            .filter((cardObj: Object) => cardObj.idCollection === collectionObj.idCollection)
            .map((cardObj: Object) => {
              const seasonObj = SEASONS.find((season: Object) => season.idSaison === cardObj.idSaison);
              const teamObj = TEAMS.find((team: Object) => team.idEquipe === seasonObj.idEquipe);
              const editorObj = EDITORS.find((editor: Object) => editor.idEditeur === cardObj.idEditeur);
              const playerObj = PLAYERS.find((player: Object) => player.idJoueur === seasonObj.idJoueur);

              playerObj.nomEquipe = teamObj.nom;
              playerObj.numero    = seasonObj.numeroJoueur;
              playerObj.position  = seasonObj.position;
              playerObj.estRecrue = seasonObj.estRecrue;
              cardObj.annee       = seasonObj.annee;

              const editor = new Editor(editorObj);
              const player = new Player(playerObj);
              return new Card(cardObj, editor, player);
            });

          cards = cards.concat(cardsList);
        });

      cards = cards.slice(0, 100);
      return Rx.Observable.of(fetchingFromServer())
        .concat(
          Rx.Observable.of(receivedResponse({
            cards,
            category,
            originAction: GET_CARDS_BY_CATEGORY
          }))
          .delay(delay)
        );
    });
}
