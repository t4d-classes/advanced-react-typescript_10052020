import { useState } from 'react';

import { Item, ItemId } from '../models/item';

export type AppendItem<S extends Item> = (item: Omit<S, 'id'>) => void;

export type ReplaceItem<S extends Item> = (item: S) => void;

export type RemoveItem = (itemId: ItemId) => void;

export type UseList = <T extends Item>(
  initialItems: T[],
) => [T[], AppendItem<T>, ReplaceItem<T>, RemoveItem];

export const useList: UseList = <T extends Item>(initialItems: T[]) => {
  const [items, setItems] = useState(initialItems);

  const appendItem: AppendItem<T> = (newItem: Omit<T, 'id'>) => {
    setItems([
      ...items,
      {
        ...newItem,
        id: Math.max(...items.map((c) => c.id), 0) + 1,
      } as T,
    ]);
  };

  const replaceItem: ReplaceItem<T> = (item: T) => {
    const itemIndex = items.findIndex((c) => c.id === item.id);
    const newItems = items.concat();
    newItems[itemIndex] = item;
    setItems(newItems);
  };

  const removeItem: RemoveItem = (itemId: ItemId) => {
    setItems(items.filter((i) => i.id !== itemId));
  };

  return [items, appendItem, replaceItem, removeItem];
};
