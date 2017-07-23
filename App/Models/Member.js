// @flow

/**
 * Represents a member of the domain.
 *
 * @export
 * @class Member
 */
export default class Member {
  name: string;
  surname: string;
  username: string;
  password: string;
  city: string;
  email: string;
  registerDate: Date;
  postalCode: string;
  profilePhotoURL: string;
  isAdmin: boolean;

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

    this.name = initObj.name;
    this.surname = initObj.surname;
    this.username = initObj.username;
    this.password = initObj.password;
    this.city = initObj.city;
    this.email = initObj.email;
    this.registerDate = initObj.registerDate;
    this.postalCode = initObj.postalCode;
    this.profilePhotoURL = initObj.profilePhotoURL;
    this.isAdmin = initObj.isAdmin;
  }
}
