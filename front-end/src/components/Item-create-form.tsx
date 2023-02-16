import React, { useContext, useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import { createItem, findByName, updateItem } from "../api/item.api";
import { ItemContext } from "../sale.item.context";
import { NotificationPlacement } from "antd/es/notification/interface";

interface ItemFormProps {
  onClose: () => void;
  onChildrenDrawerClose?: () => void;
  showChildrenDrawer?: () => void;
  childrenDrawer?: boolean;
  open: boolean;
  itemId?: number | undefined;
  mode?: "create" | "edit";
  ItemForm?: any;
}
export interface ItemTypes {
  ItemId: number;
  createdAt: Date;
  name: string;
  description: string;
  price: number;
  salesTax: number;
  sku: string;
  quantity: number;
}

const ItemCreateForm = ({
  onClose,
  open,
  itemId,
  mode,
  ItemForm,
}: ItemFormProps) => {
  const { setMode, data, setData } = useContext(ItemContext);
  const [validationStatus, setValidationStatus] = useState<any>();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: "Success Message",
      description:
        mode === "create"
          ? "Item Added successfully"
          : "Item Updated Successfully",
      placement,
    });
  };
  const handleCreate = async (value: any) => {
    await createItem(value);
    openNotification("topRight");
    ItemForm.resetFields();
    setData?.(!data);
  };
  const handleUpdate = async (value: any) => {
    await updateItem(itemId, value);
    openNotification("topRight");
    ItemForm.resetFields();
    setData?.(!data);
    onClose();
  };
  const onFinish = async (value: any) => {
    mode === "create" ? handleCreate(value) : handleUpdate(value);
  };

  const handleOnClose = () => {
    onClose();
    ItemForm.resetFields();
    setMode?.("create");
  };
  
  return (
    <>
      <Drawer
        title={
          <>
            <span>
              <strong>
                {mode === "create"
                  ? "Sale Item Order Entry Form"
                  : "Sale Item Order Update Form"}
              </strong>{" "}
              <Button className="float-right" onClick={handleOnClose}>
                {" "}
                Close
              </Button>
            </span>
          </>
        }
        closable={false}
        open={open}
        placement="top"
        mask={true}
        contentWrapperStyle={{
          width: "800px",
          marginRight: "295vw",
          marginLeft: "365px",
          marginTop: "100px",
          height: "550px",
        }}
        maskStyle={{}}
      >
        <div className="grid place-items-center bg-slate-200 p-2">
          <div className=" border-2 rounded-sm w-4/6 p-4 bg-neutral-300">
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
            
              style={{ maxWidth: 600 }}
              form={ItemForm}
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                validateStatus={validationStatus}
                name="name"
                hasFeedback
                rules={[
                  { type: "string", min: 3, max: 42 },
                  ({ getFieldValue }) => ({
                    async validator(rule, value) {
                      if (
                        value === "null" ||
                        value === undefined ||
                        value.length < 3
                      ) {
                        return setValidationStatus("error");
                      } else {
                        setValidationStatus("validating");
                        await findByName(String(value).trim())
                          .then((res) => {
                            if (res.length === 0) {
                              setValidationStatus("success");
                              return Promise.resolve();
                            }
                            if (res.length !== 0) {
                              setValidationStatus("error");
                              return Promise.reject(
                                new Error("Item already exist")
                              );
                            }
                          })
                          .catch((error) => {
                            setValidationStatus("error");
                            return Promise.reject(
                              new Error(error && error.message)
                            );
                          });
                      }
                    },
                  }),
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                hasFeedback
                rules={[{ type: "number", min: 0 }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Sales Tax"
                name="salesTax"
                hasFeedback
                rules={[{ type: "number", min: 0, max: 99 }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Sku"
                name="sku"
                hasFeedback
                rules={[{ type: "string", min: 5, max: 100 }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Quantity"
                name="quantity"
                hasFeedback
                rules={[{ type: "number", min: 0 }]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                hasFeedback
                rules={[{ type: "string", min: 10, max: 300 }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                {contextHolder}
                <Button
                  className={
                    "float-right bg-stone-600 hover:bg-lime-500 hover:w-30 hover:text-xl hover:h-10"
                  }
                  htmlType="submit"
                >
                  {mode === "create" ? "Save" : "Update"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ItemCreateForm;
