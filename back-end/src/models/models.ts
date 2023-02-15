import { Table, Model, Column, DataType, Max, AutoIncrement } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";


@Table({
  timestamps: false,
  tableName: "items",
})

export class Items extends Model {

 @Column({
type:DataType.INTEGER,
autoIncrement:true,
primaryKey:true,
allowNull:true
 })
ItemId!: number
  @Column({
    type: DataType.STRING,
    allowNull: false,
   
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;
@Column({
  type:DataType.INTEGER,
  allowNull:true,
  defaultValue:0,
})
price!:number
@Column({
  type:DataType.INTEGER,
  allowNull:true,
  defaultValue:0,
})
salesTax!:number
@Column({
  type:DataType.DATE,
  allowNull:true,
  defaultValue:new Date()
})
createdAt!:Date
@Column({
  type:DataType.STRING,
  allowNull:true,
})
sku!:string
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
    autoIncrement:false
  })
  quantity!: number;
}

