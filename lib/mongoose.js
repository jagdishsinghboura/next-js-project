import mongoose from "mongoose";
export  async  function initMongoose() { 
   return  await mongoose.connect("mongodb://127.0.0.1:27017/ecomerce").then(()=>console.log('tes')).catch(()=>console.log("error"));
}
