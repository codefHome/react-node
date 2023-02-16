/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Popconfirm,
 
} from "antd";

import ItemTable from "./item.table";
import ItemCreateForm, { ItemTypes } from "./Item-create-form";
import { deleteItem} from "../api/item.api";
import { ColumnsType } from "antd/es/table";
import { ItemContext, ItemContextProvider } from "../sale.item.context";
import {DeleteIcon, EditIcon } from "../svg/item-sale.icons";

const ViewSaleItems = () => {
  const {ItemId,items, setItemId, mode, setMode } = useContext(ItemContext);
  const [ItemForm] = Form.useForm();

  const handleDelete = async (items: ItemTypes) => {
    await deleteItem(items);

  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);

  const showDrawer = () => {
    setMode?.("create");
    setOpenDrawer(true);
  };


  const showUpdateDrawer = (items: any) => {
    setMode?.("edit");
    setItemId?.(items?.ItemId);
    ItemForm.setFieldsValue({
      name: items.name,
      price: items.price,
      salesTax: items.salesTax,
      sku: items.sku,
      quantity: items.quantity,
      description: items.description,
    });
    setOpenViewDrawer(true);
  };

  const CloseonChildrenDrawer = () => {
    setOpenViewDrawer(false);
    setMode?.("create");
  };
  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const columns: ColumnsType<ItemTypes> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
      fixed: "left",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 65,
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: "Tax",
      dataIndex: "salesTax",
      key: "salesTax",
      width: 60,
    },
    {
      title: "Sku",
      key: "sku",
      dataIndex: "sku",
      width: 150,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 90,
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 3,
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width:300
      
    },
    {
      title: "Action",
      key: "action",
      width: 120,
      fixed: "right",
      render: (items) => (
        <div className="flex flex-row space-y-2">
          <Button
            className="hover:text-lg text-md"
            type="link"
            onClick={() => showUpdateDrawer(items)}
          >
            <EditIcon />
          </Button>

          <Popconfirm
            placement="leftBottom"
            title="Delete the Item"
            description="Are you sure to delete this Item?"
            cancelText="No"
            okText="Yes"
            onConfirm={() => handleDelete(items)}
          >
            <a href="#">
              <DeleteIcon />
            </a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <ItemContextProvider>
        <div className="grid bg-slate-900 p-2">
          <div className=" border-2 rounded-sm  p-4 bg-neutral-300">
            <span>
              <Button
                className="hover:text-2xl text-lg mb-3 float-right"
                type="link"
                onClick={showDrawer}
              >
                
                <strong> Add Item</strong>
              </Button>
            </span>

            <ItemTable data={items} columns={columns} />
          </div>
        </div>

        <ItemCreateForm
          onClose={mode === "create" ? closeDrawer : CloseonChildrenDrawer}
          open={mode === "create" ? openDrawer : openViewDrawer}
          itemId={ItemId}
          mode={mode}
          ItemForm={ItemForm}
        />
      </ItemContextProvider>
    </>
  );
};

export default ViewSaleItems;
