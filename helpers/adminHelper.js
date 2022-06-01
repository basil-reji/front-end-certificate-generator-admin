const collections = require("../config/db").variables;
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const objectId = require('mongodb').ObjectId

module.exports = {
    addAdmin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            adminData.Password = await bcrypt.hash(adminData.Password, 10);
            db.get()
                .collection(collections.ADMIN_COLLECTION)
                .insertOne(adminData)
                .then((data) => {
                    resolve(data);
                });
        });
    },

    getAdmins: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.ADMIN_COLLECTION)
                .find()
                .project( {'Email': 1, '_id':0} )
                .map(x => x.Email)
                .toArray()
                .then((response) => {
                    resolve(response);
                });
        });
    },

    getAdminDatas: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.ADMIN_COLLECTION)
                .find()
                .toArray()
                .then((response) => {
                    resolve(response);
                });
        });
    },

    loginAdmin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let admin = await db
                .get()
                .collection(collections.ADMIN_COLLECTION)
                .findOne({ Email: adminData.Email });
            if (admin) {
                bcrypt
                    .compare(adminData.Password, admin.Password)
                    .then((status) => {
                        if (status) {
                            console.log("Login Success");
                            response.admin = admin;
                            response.status = true;
                            resolve(response);
                        } else {
                            console.log("Login Failed");
                            resolve({ status: false });
                        }
                    });
            } else {
                console.log("Admin not found");
                resolve({ status: false });
            }
        });
    },

    removeAdmin:(adminId)=>{
        return new Promise((resolve, reject)=>{
            db.get().collection(collections.ADMIN_COLLECTION).remove({_id:objectId(adminId)}).then((response)=>{
                resolve(response)
            })
        })
    },

    getContacts:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.CONTACT_COLLECTION).find().toArray().then((response)=>{
                resolve(response)
            })
        })
    },
    
    deleteContact: (id) =>{
        return new Promise((resolve, reject)=>{
            db.get().collection(collections.CONTACT_COLLECTION).remove({_id:objectId(id)}).then((response)=>{
                resolve(response)
            })
        })
    },
};
