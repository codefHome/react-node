import { ItemTypes } from './../models/validations';
import { Items } from './../models/models';
import express, { Request, Response } from "express";
import connection from '../config/connection';
import app from '../app';
import Joi from 'joi'
import { validateItemsData } from '../models/validations';

const router = express.Router()

router.post("/items/createItem",async(req:Request,res:Response): Promise<Response>=>{
const valid= validateItemsData(req.body);
if(valid.error){
 console.log(valid.error)
 return res.status(400).json(valid.error.details[0].message)
}else{
  const item:Items = await Items.create({
    ...req.body});
     return res.status(201).json(item);
}
    
    })
   
   
    router.get('/items/findAll',async(req:Request,res:Response): Promise<Response>=>{
     const allItems: Items[]= await Items.findAll();
     return res.status(200).json(allItems)
    })
   
    router.get("/items/findOne/:ItemId",async(req:Request,res:Response):Promise<Response> =>{
     const {ItemId} = req.params;
     const item: Items | null = await Items.findByPk(ItemId);
     return res.status(200).json(item);
   })

    router.get("/items/findByName/:name",async(req:Request,res:Response):Promise<Response> =>{
     const {name} = req.params;
     const item: Items[] | null = await Items.findAll({where:{name:name},})
     return res.status(200).json(item);
   })




   router.put("/items/update/:ItemId",async(req:Request,res:Response): Promise<Response> =>{
     const {ItemId}= req.params;
    const valid=validateItemsData(req.body);
    if(valid.error){
      return res.status(400).json(valid.error.details[0].message);
    }else{
      await Items.update({...req.body},{where: {ItemId}})
      const updatedItem: Items | null = await Items.findByPk(ItemId);
      return res.status(200).json(updatedItem);
    }
    
   }) 
   
   router.delete("/items/delete/:ItemId",async (req:Request,res:Response): Promise<Response> => {
     const {ItemId} = req.params;
     const deletedItem: Items | null = await Items.findByPk(ItemId);
     await Items.destroy({where: {ItemId}});
     return res.status(200).json(deletedItem);
   })
   const getPagination = (page:any, size:any) => {
    const limit = size ? +size : 6;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

  const getPagingData = (data:any, page:any, limit:number) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, items, totalPages, currentPage };
  };
router.get('/items/findAndCount',async(req:Request,res:Response)=>{
  const { page, size, title } = req.query;
  const {limit,offset}= getPagination(page,size);
  const allItems:any= await Items.findAndCountAll({ where: {}, limit, offset }).then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Items."
    });
  })

    return res.status(200).json(allItems); 
   
})
   

   export default router;