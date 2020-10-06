import { Component } from 'react';

import { Item } from '../models/item';

export type ListManagerProps<T extends Item> = {
  items: T[];
  render: (x: {
    items: T[];
    appendItem: (newItem: Omit<T, 'id'>) => void;
    otherProps: { [x: string]: any };
  }) => JSX.Element;
};

export type ListManagerState<T extends Item> = {
  items: T[];
};

export class ListManager<T extends Item> extends Component<
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

    return this.props.render({
      items: this.state.items,
      appendItem: this.appendItem,
      otherProps,
    });
  }
}
