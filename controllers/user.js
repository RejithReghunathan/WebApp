const db = require("../cofiq/connection");
const bcrypt = require("bcrypt");
module.exports = {
  userSignup: (user) => {
    return new Promise(async (resolve, reject) => {
      user.password = await bcrypt.hash(user.password, 10);
      user.role=1
      db.get().collection("user").insertOne(user).then((result)=>{
        resolve(result.ops[0]);  
      })
    });
  },
  userLogin:(userData)=>{
      return new Promise(async(resolve,reject)=>{
          let Status=false
          let response={}
          let user = await db.get().collection("user").findOne({email:userData.email})
          if(user){
              bcrypt.compare(userData.password,user.password).then((status)=>{
                  if(status){
                      response.Status=true
                      response.user=user
                      resolve(response)
                  }else{
                      reject({status:false})
                  }
              })
          }else{
              reject({status:false})
          }
      })
  },
  emailExist:(userEmail)=>{
    console.log(userEmail.email);
    return new Promise(async(resolve,reject)=>{
      let email = await db.get().collection("user").findOne({email:userEmail.email})
      if(email)
      {
        resolve(email)
      }
      else{
        reject()
      }
    })
  }
};
