import Joi from 'joi'
export interface ItemTypes{
    ItemId:number
    name:string,
    description:string,
    price: number,
    salesTax:number,
    createdAt: Date,
    sku: string,
    quantity:number
  }
export const validateItemsData=(item:ItemTypes)=>{
    const itemSchema= Joi.object({
        ItemId:Joi.number().integer(),
        name: Joi.string().max(42).min(3).required(),
        description: Joi.string().min(10).max(200).required(),
        price:Joi.number().integer().required(),
        salesTax: Joi.number().integer().required(),
        createdAt:Joi.date(),
        sku:Joi.string().max(45).min(10).required(),
        quantity: Joi.number().integer()
    })
    return itemSchema.validate(item);
}