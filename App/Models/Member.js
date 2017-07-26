// @flow

/**
 * Represents a member of the domain.
 *
 * @export
 * @class Member
 */
export default class Member {
  prenom: string;
  nom: string;
  nomUtilisateur: string;
  motDePasse: string;
  courriel: string;
  dateInscription: Date;
  postalCode: string;
  lienPhotoProfil: string;
  estAdmin: boolean;

  /**
   * Creates an instance of Member.
   * @param {Object} initObj An object that initializes the member.
   * @throws {TypeError} Thrown when initObj is not an object.
   * @memberof Member
   */
  constructor(initObj: Object) {
    if (!(initObj instanceof Object)) {
      throw new TypeError('initObj of Member is not an object. It should be.');
    }

    this.prenom = initObj.prenom;
    this.nom = initObj.nom;
    this.nomUtilisateur = initObj.nomUtilisateur;
    this.motDePasse = initObj.motDePasse;
    this.courriel = initObj.courriel;
    this.dateInscription = initObj.dateInscription;
    this.lienPhotoProfil = initObj.lienPhotoProfil;
    this.estAdmin = initObj.admin;
  }
}
