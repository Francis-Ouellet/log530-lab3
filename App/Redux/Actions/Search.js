// @flow
import Rx from 'rxjs';

import {fetchingFromServer, receivedResponse} from '.';
import {
  Member,
  Player,
  Editor,
  Card
} from '../../Models';

const MEMBERS = require('./dummy_members.json');
const CARDS = require('./dummy_cards.json');
const PLAYERS = require('./dummy_players.json');
const EDITORS = require('./dummy_editors.json');
const SEASONS = require('./dummy_seasons.json');
const TEAMS = require('./dummy_teams.json');

export const SEARCH = 'SEARCH';

export function search(term: string) {
  return {
    type: SEARCH,
    term
  };
}

export function searchEpic(action: Object) {
  const delay = Math.random() * (1500 - 200) + 200;
  const delay2 = Math.random() * (2000 - 400) + 400;

  return action.ofType(SEARCH)
    .switchMap((action: Object) => {
      const members = MEMBERS
        .filter((member: Object) =>
          member.prenom.includes(action.term) ||
          member.nom.includes(action.term) ||
          member.nomUtilisateur.includes(action.term)
        )
        .map((member: Object) => new Member(member));
      const cards = PLAYERS.filter((player: Object) =>
        player.prenom.includes(action.term) ||
        player.nom.includes(action.term)
      )
      .map((playerObj: Object) => {
        const seasonObj = SEASONS.find((season: Object) => season.idJoueur === playerObj.idJoueur);
        const teamObj = TEAMS.find((team: Object) => team.idEquipe === seasonObj.idEquipe);
        const cardObj = CARDS.find((card: Object) => card.idSaison === seasonObj.idSaison);
        const editorObj = EDITORS.find((editor: Object) => editor.idEditeur === cardObj.idEditeur);

        playerObj.nomEquipe = teamObj.nom;
        playerObj.numero    = seasonObj.numero;
        playerObj.position  = seasonObj.position;
        playerObj.estRecrue = seasonObj.estRecrue;
        cardObj.annee       = seasonObj.annee;

        const editor = new Editor(editorObj);
        const player = new Player(playerObj);
        return new Card(cardObj, editor, player);
      });

      return Rx.Observable.of(fetchingFromServer())
        .concat(
          Rx.Observable.of(receivedResponse({
            members,
            originAction: SEARCH
          }))
          .delay(delay)
        )
        .concat(
          Rx.Observable.of(receivedResponse({
            cards,
            originAction: SEARCH
          }))
          .delay(delay2)
        );
    });
}

