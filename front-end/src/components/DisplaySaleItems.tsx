/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Popconfirm,
 
} from "antd";

import ItemTable from "./item.table";
import ItemCreateForm, { ItemTypes } from "./Item-create-form";
import { deleteItem, getAllItems} from "../api/item.api";
import { ColumnsType } from "antd/es/table";
import { ItemContext, ItemContextProvider } from "../sale.item.context";
import {DeleteIcon, EditIcon } from "../svg/item-sale.icons";


const ViewSaleItems = () => {
  const {ItemId, setItemId, mode, setMode } = useContext(ItemContext);
  const [ItemForm] = Form.useForm();
const[items,setItems]=useState<ItemTypes[]>([])
  const handleDelete = async (items: ItemTypes) => {
   const deleted= await deleteItem(items);
   setItems(oldItem => oldItem.filter(item=> item.ItemId !== deleted.ItemId))


  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);

  const showDrawer = () => {
    setMode?.("create");
    setOpenDrawer(true);
  };
  useEffect(()=>{
    (async()=>{
    setItems(await getAllItems());
    })()
  },[])

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
      fixed: "left",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 3,
      },
    },
    {
      title: "Tax",
      dataIndex: "salesTax",
      key: "salesTax",
    },
    {
      title: "Sku",
      key: "sku",
      dataIndex: "sku",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 3,
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      
    },
    {
      title: "Action",
      key: "action",
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
        <div style={{maxWidth:850,
    minWidth:300}} className="grid bg-slate-700 p-2">
          <div   className=" border-2 rounded-sm  p-4 bg-slate-900">
           
              <Button
                className="hover:text-2xl text-lg mb-3 float-right"
                type="link"
                onClick={showDrawer}
              >
                
                <strong> Add Item</strong>
              </Button>
         

           
          </div>
          <ItemTable data={items} columns={columns} />
        </div>

        <ItemCreateForm
          onClose={mode === "create" ? closeDrawer : CloseonChildrenDrawer}
          open={mode === "create" ? openDrawer : openViewDrawer}
          itemId={ItemId}
          mode={mode}
          ItemForm={ItemForm}
          setItems={setItems}
      
        />
      </ItemContextProvider>
    </>
  );
};

export default ViewSaleItems;
