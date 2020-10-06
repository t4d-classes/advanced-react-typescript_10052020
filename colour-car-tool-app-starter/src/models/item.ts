import { NumberLiteralType } from 'typescript';

export type ItemId = number;

export interface Item {
  id: ItemId;
}

export type NewItem = Omit<Item, 'id'>;
