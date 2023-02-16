import {Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ItemTypes } from "./Item-create-form";

interface DataProps {
  data?: ItemTypes[];
  columns?: ColumnsType<ItemTypes>;
}




const ItemTable = ({ data, columns }: DataProps) => {

  return(
  
    <Table
    columns={columns}
    dataSource={data}
    bordered
    style={{maxWidth:800,
    minWidth:400}}
    pagination={{ pageSize: 10 }}
    scroll={{ x: "calc(350px + 50%)", y: 380 }}
  />
  )
}
  



export default ItemTable;
