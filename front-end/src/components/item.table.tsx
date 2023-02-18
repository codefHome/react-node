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
    className="font-serif border-spacing-1 bg-white"
    columns={columns}
    dataSource={data}
    bordered
    style={{maxWidth:850,
    minWidth:300
    
  }}
    pagination={{ pageSize: 10 }}
    scroll={{ x: "calc(450px + 50%)", y: 380 }}
  />
  )
}
  



export default ItemTable;
