const { DBRef } = require('mongodb')
const db = require('../cofiq/connection')
var objectId =require('mongodb').ObjectID

module.exports={
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
           let user=await db.get().collection("user").find({role:1}).toArray()
           if(user){
           resolve(user)
           }else{
               reject({err:"error"})
           }
        })
    },
    deleteUserById:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection("user").removeOne({_id:objectId(userId)}).then((result)=>{
                resolve(result)
            })
        })
    },
    getUserById:(userId)=>{
        return new Promise(async(resolve,reject)=>{
            let user = db.get().collection('user').findOne({_id:objectId(userId)}).then((result)=>{
                resolve(result)
            })
        })
    },
    updateUserId:(userId,data)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('user').updateOne({_id:objectId(userId)},{
                $set:{
                    name:data.name,
                    email:data.email
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    },
    SearchUser:(userName)=>{
        return new Promise(async(resolve,reject)=>{
          let user= await db.get().collection('user').findOne({name:userName}).then((result)=>{
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    }
}