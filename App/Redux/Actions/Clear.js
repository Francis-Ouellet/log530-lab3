// @flow

export const CLEAR_MEMBERS = 'CLEAR_MEMBERS';
export const CLEAR_CARDS = 'CLEAR_CARDS';

export function clearMembers() {
  return {
    type: CLEAR_MEMBERS
  };
}

export function clearCards(category: string) {
  return {
    type: CLEAR_CARDS,
    category
  };
}
