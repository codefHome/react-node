import axios from "../api/axios.config";
import { ItemsEndPoint } from "./items.endpoint";

export interface ItemTypes {
  ItemId: number;
  name: string;
  description: string;
  price: number;
  salesTax: number;
  createdAt: Date;
  sku: string;
  quantity: number;
}
export const getAllItems = async () => {
  const response = await axios
    .get(ItemsEndPoint.getAllItems, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const findById = async (id: number) => {
  const response = await axios
    .get(`${ItemsEndPoint.getOneItem}/${id}`, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
export const findByName = async (name: string) => {
  const response = await axios
    .get(`${ItemsEndPoint.findByName}${name}`, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const createItem = async (item: ItemTypes) => {
  const response = await axios
    .post(ItemsEndPoint.createItem, item, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const updateItem = async (
  itemId: number | undefined,
  item: ItemTypes
) => {
  const response = await axios
    .put(`${ItemsEndPoint.updateItem}${itemId}`, item, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export const deleteItem = async (item: ItemTypes) => {
  const response = await axios
    .delete(`${ItemsEndPoint.deleteItem}${item.ItemId}`, {})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
