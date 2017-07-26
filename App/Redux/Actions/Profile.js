// @flow

export const GETTING_USER_PROFIL = 'GETTING_USER_PROFIL';
export const UPDATING_USER_PROFIL = 'UPDATING_USER_PROFIL';

export function fetchingMemberProfile(): {type: string} {
  return {
    type: GETTING_USER_PROFIL
  };
}

export function editingMemberProfile(newMember : Member): {type: string} {
  return {
      type: UPDATING_USER_PROFIL,
      newMember
    };
}
