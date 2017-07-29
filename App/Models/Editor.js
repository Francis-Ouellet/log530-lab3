// @flow

/**
 * Represents an editor of a card of the domain.
 *
 * @export
 * @class Editor
 */
export default class Editor {
  idEditeur: number;
  nom: string;

  /**
   * Creates an instance of Editor.
   * @param {Object} initObj An object that initializes the editor.
   * @throws {TypeError} Thrown when initObj is not an object.
   * @memberof Editor
   */
  constructor(initObj: Object) {
    if (!(initObj instanceof Object)) {
      throw new TypeError('initObj of Member is not an object. It should be.');
    }

    this.idEditeur = initObj.idEditeur;
    this.nom = initObj.nom;
  }
}
