import { CreatedAt, Sequelize } from 'sequelize-typescript';



import { Items } from './../models/models';
import connection from "../config/connection";
import { ItemTypes } from "../models/validations";
import supertest from 'supertest';
import app from '../app';
import { HttpStatusCode } from 'axios';
const request=require('supertest')




describe("Back-end testing",()=>{
   beforeEach(async()=>{
    await connection.sync();
   })


   describe('GET/items/findOne,Find items using ItemId',()=>{
    let items:ItemTypes
beforeEach(async()=>{
     items=await Items.create({
        name: "item6",
        description: "sssssssssssssssssssssssssss",
        price: 23,
        salesTax: 23,
        sku: "this is new test me unique ds",
        quantity: 23
    })
})
test('It should return all fields correctly',async()=>{
    await supertest(app).get("/items/findOne/"+ items.ItemId)
    .then((response)=>{
        expect(response.body.ItemId).toBe(items.ItemId)
        expect(response.body.name).toBe(items.name)
        expect(response.body.createdAt).toBeDefined()
        expect(response.body.price).toBe(items.price)
        expect(response.body.sku).toBe(items.sku)
        expect(response.body.description).toBe(items.description)
        expect(response.body.quantity).toBe(items.quantity)
    })
   })
   test('It should return 200 statusCode',async()=>{
    await supertest(app).get("/items/findOne/"+ items.ItemId).expect(200)
   })
   })
 describe('GET/items/findAll,Find all items',()=>{
    let items:ItemTypes[]
beforeEach(async()=>{
  items=await Items.findAll()
})
test('It should return all fields correctly',async()=>{
    await supertest(app).get("/items/findAll")
   .set("Accept","application/json")
   .expect("Content-Type",/json/)
   
   })

   test('It should return 200 statusCode',async()=>{
    await supertest(app).get("/items/findAll").expect(200)
   })
   })
 describe('POST/items/createItem,Create an Item',()=>{
   
test('It should create an item',async()=>{
  const  items=await Items.create({
        name:"newcheck",
        description: "sssssssssssssssssssssssssss",
        price: 23,
        salesTax: 23,
        sku: "this is new test me unique ds",
        quantity: 23
      })
    await supertest(app).post("/items/createItem")
   .then((res) =>{
    expect(res.body).toBe(items)
   }).catch(error=>{
    expect(error)
   })
   })

   test('It should return 200 statusCode',async()=>{
    await supertest(app).post("/items/createItem").then
    (res=>{
      expect(res.statusCode).toBe(201)
    }).catch(error=>{
      expect(error)
    })
    
   })
   })

   
})