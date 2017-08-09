// @flow
import {Editor, Player} from '.';

/**
 * Represents a collection card of the domain.
 *
 * @export
 * @class Card
 */
export default class Card {
  idFiche: number;
  datePublication: Date;
  valeur: number;
  etat: 'IMPECCABLE' | 'BONNE' | 'MOYENNE' | 'PASSABLE' | 'PIETRE';
  lienImageDevant: string;
  lienImageDerriere: string;
  annee: number;
  _editeur: Editor;
  _joueur: Player;

  get editeur(): Editor {
    return this._editeur;
  }

  get joueur(): Player {
    return this._joueur;
  }

  /**
   * Creates an instance of Card.
   * @param {Object} initObj An object to instantiate the card.
   * @param {Editor} editeur The editor of the card.
   * @param {Player} joueur The player on the card.
   * @throws {TypeError} Thrown when initObj is not an object.
   * @memberof Card
   */
  constructor(initObj: Object, editeur: Editor, joueur: Player) {
    if (!(initObj instanceof Object)) {
      throw new TypeError('initObj of Member is not an object. It should be.');
    }

    this.idFiche = initObj.idFiche;
    this.datePublication = new Date(initObj.datePublication);
    this.valeur = initObj.valeur;
    this.etat = initObj.etat.toUpperCase();
    this.lienImageDevant = initObj.lienImageDevant;
    this.lienImageDerriere = initObj.lienImageDerriere;
    this.annee = initObj.annee;
    this._editeur = editeur;
    this._joueur = joueur;
  }
}
