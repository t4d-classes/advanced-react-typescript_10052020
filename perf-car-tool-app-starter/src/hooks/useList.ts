import { useState } from 'react';

import { Item, ItemId } from '../models/Item';

type AppendItem<S> = (item: Omit<S, 'id'>) => void;
type ReplaceItem<S> = (item: S) => void;
type RemoveItem = (itemId: ItemId) => void;

type UseList = <ItemType extends Item>(initialItems: ItemType[]) =>
  ([
    ItemType[],
    AppendItem<ItemType>,
    ReplaceItem<ItemType>,
    RemoveItem,
  ]);

export const useList: UseList = <ItemType extends Item>(initialItems: ItemType[]) => {

  const [ items, setItems ] = useState([ ...initialItems ]);

  const addItem: AppendItem<ItemType> = (item) => {

    setItems([
      ...items,
      {
        ...item,
        id: Math.max(...items.map(i => i.id), 0) + 1,
      } as ItemType,
    ]);
  };

  const saveItem: ReplaceItem<ItemType> = (item) => {
    const itemIndex = items.findIndex(i => i.id === item.id);
    if (itemIndex >= 0) {
      const newItems = items.concat();
      newItems[itemIndex] = item;
      setItems(newItems);
    }
  };

  const deleteItem: RemoveItem = (itemId) => {
    setItems(items.filter(i => i.id !== itemId));
  };

  return [ items, addItem, saveItem, deleteItem ];

};