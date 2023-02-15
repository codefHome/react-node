import { Form } from "antd";
import { createContext, useCallback, useEffect, useState } from "react";
import { getAllItems, ItemTypes } from "./api/item.api";

interface ItemProps {
  ItemForm?: any;
  mode?: "create" | "edit";
  setMode?: (value: "create" | "edit") => void;
  ItemId?: number;
  setItemId?: (value: number) => void;
  items?: ItemTypes[];
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
  const [items, setItems] = useState<ItemTypes[]>([]);
  const [data, setData] = useState(false);

  const fetchData = useCallback(async () => {
    await setItems(await getAllItems());
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <Provider
      value={{
        ItemForm,
        mode,
        setMode: (value) => setMode(value),
        ItemId,
        setItemId: (value) => setItemId(value),
        items,
        data,
        setData: (value) => setData(value),
      }}
    >
      {children}
    </Provider>
  );
};

export { ItemContext, ItemContextProvider };
