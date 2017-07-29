// @flow

/**
 * Represents a sports player in the domain.
 *
 * @export
 * @class Player
 */
export default class Player {
  idJoueur: number;
  nom: string;
  prenom: string;
  nomEquipe: string;
  numero: number;
  position: string;
  estRecrue: boolean;

  /**
   * Creates an instance of Player.
   * @param {Object} initObj An object that initializes the player.
   * @throws {TypeError} Thrown when initObj is not an object.
   * @memberof Player
   */
  constructor(initObj: Object) {
    if (!(initObj instanceof Object)) {
      throw new TypeError('initObj of Member is not an object. It should be.');
    }

    this.idJoueur = initObj.idJoueur;
    this.nom = initObj.nom;
    this.prenom = initObj.prenom;
    this.nomEquipe = initObj.nomEquipe;
    this.numero = initObj.numero;
    this.position = initObj.position;
    this.estRecrue = initObj.estRecrue;
  }
}
