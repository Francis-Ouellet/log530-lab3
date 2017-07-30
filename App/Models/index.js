// @flow
import Member from './Member';
import Card from './Card';
import Editor from './Editor';
import Player from './Player';

class Collection {
  static get TYPE_HOCKEY(): string {
    return 'HOCKEY';
  }

  static get TYPE_FOOTBALL(): string {
    return 'FOOTBALL';
  }

  static get TYPE_BASEBALL(): string {
    return 'BASEBALL';
  }

  static get TYPE_BASKETBALL(): string {
    return 'BASKETBALL';
  }
}

export {
  Member,
  Card,
  Editor,
  Player,
  Collection
};
