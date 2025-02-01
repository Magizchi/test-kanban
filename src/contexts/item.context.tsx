import React, { FunctionComponent, useContext, useState } from 'react';
import { KanbanItem } from '@models/todos';

interface ItemListContextProps {
  items: KanbanItem[];
  setItems: React.Dispatch<React.SetStateAction<KanbanItem[]>>;
  removeItem: (id: number) => void;
  addItem: (item?: KanbanItem) => void;
  patchItem: (item: KanbanItem) => void;
  allowUpdate: (id: number) => void;
}

const ProductListContext = React.createContext<ItemListContextProps>({
  items: [] as KanbanItem[],
  setItems: () => {},
  removeItem: () => {},
  addItem: () => {},
  patchItem: () => {},
  allowUpdate: () => {},
});

const ItemListProvider: FunctionComponent<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [items, setItems] = useState<KanbanItem[]>([]);

  const addItem = (item: KanbanItem = {} as KanbanItem) => {
    setItems((curr) => [item, ...curr]);
  };

  const patchItem = (newItem: KanbanItem) => {
    setItems(() =>
      items.map((item) => {
        if (item.id === newItem.id) {
          return {
            ...newItem,
            updateMode: false,
          };
        } else {
          return item;
        }
      }),
    );
  };

  const removeItem = (id: number) => {
    setItems(() => items.filter((item) => item.id !== id));
  };

  const allowUpdate = (id: number) => {
    setItems(() =>
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            updateMode: true,
          };
        } else {
          return item;
        }
      }),
    );
  };
  return (
    <ProductListContext.Provider
      value={{ items, setItems, removeItem, addItem, patchItem, allowUpdate }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

const useItemListContext = (): ItemListContextProps => {
  const context = useContext(ProductListContext);
  if (context === undefined)
    throw new Error(
      'useProductListContext must be used within a ShoppingCartProvider',
    );
  return context as ItemListContextProps;
};

export { ItemListProvider, useItemListContext };
