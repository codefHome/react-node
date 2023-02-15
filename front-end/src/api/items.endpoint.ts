import { environment } from "../environments/environment";

export const ItemsEndPoint = {
  getAllItems: `${environment.urls.web}/items/findAll`,
  getOneItem: `${environment.urls.web}/items/findOne`,
  createItem: `${environment.urls.web}/items/createItem`,
  updateItem: `${environment.urls.web}/items/update/`,
  deleteItem: `${environment.urls.web}/items/delete/`,
  findByName: `${environment.urls.web}/items/findByName/`,
};
