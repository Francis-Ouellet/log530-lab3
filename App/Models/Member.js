// @flow

const DEFAULT_USER_IMAGE_URL = 'http://www.datastax.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

/**
 * Represents a member of the domain.
 *
 * @export
 * @class Member
 */
export default class Member {
  idMembre: number;
  prenom: string;
  nom: string;
  nomUtilisateur: string;
  motDePasse: string;
  courriel: string;
  dateInscription: Date;
  postalCode: string;
  lienPhotoProfil: string;
  estAdmin: boolean;
  nombreDeCartes: number;

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

    this.idMembre = initObj.idMembre;
    this.prenom = initObj.prenom;
    this.nom = initObj.nom;
    this.nomUtilisateur = initObj.nomUtilisateur;
    this.motDePasse = initObj.motDePasse;
    this.courriel = initObj.courriel;
    this.dateInscription = new Date(initObj.dateInscription);
    this.lienPhotoProfil = initObj.lienPhotoProfil || DEFAULT_USER_IMAGE_URL;
    this.estAdmin = initObj.admin;
    this.nombreDeCartes = initObj.nombreDeCartes;
  }
}
