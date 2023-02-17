import { Form } from "antd";
import { createContext, useState } from "react";
import {ItemTypes } from "./api/item.api";

interface ItemProps {
  ItemForm?: any;
  mode?: "create" | "edit";
  setMode?: (value: "create" | "edit") => void;
  ItemId?: number;
  setItemId?: (value: number) => void;
  reFreshTable?: ItemTypes[];
  data?: boolean;
  setData?: (value: boolean) => void;
}

const ItemContext = createContext<ItemProps>({});

const { Provider } = ItemContext;

const ItemContextProvider = ({ children }: any) => {
  const [ItemForm] = Form.useForm();
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [ItemId, setItemId] = useState<number>();

 
  return (
    <Provider
      value={{
        ItemForm,
        mode,
        setMode: (value) => setMode(value),
        ItemId,
        setItemId: (value) => setItemId(value),
      }}
    >
      {children}
    </Provider>
  );
};

export { ItemContext, ItemContextProvider };
