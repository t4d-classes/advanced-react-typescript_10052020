import React, { Component } from 'react';

import { Item } from '../models/item';

export type ListManagerProps<T extends Item> = {
  items: T[];
};

export type ListManagerState<T extends Item> = {
  items: T[];
};

export const withListManager = <T extends Item>(
  PresentationalComponent: Function,
) => {
  return class ListManager extends Component<
    ListManagerProps<T>,
    ListManagerState<T>
  > {
    // stateful data
    state = {
      items: [...this.props.items],
    };

    // stateful logic
    appendItem = (newItem: Omit<T, 'id'>) => {
      this.setState({
        items: [
          ...this.state.items,
          {
            ...newItem,
            id: Math.max(...this.state.items.map((c) => c.id), 0) + 1,
          } as T,
        ],
      });
    };

    render() {
      const { items, ...otherProps } = this.props;

      return (
        <PresentationalComponent
          {...otherProps}
          items={this.state.items}
          onAppendItem={this.appendItem}
        />
      );
    }
  };
};
