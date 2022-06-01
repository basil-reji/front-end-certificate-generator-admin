const collections = require("../config/db").variables;
const db = require("../config/db");
const bcrypt = require("bcrypt");
const objectId = require('mongodb').ObjectId

module.exports = {
    contact: (data) => {
        return new Promise((resolve, reject) => {
            //console.log(data);
            data.date = new Date()
            db.get()
                .collection(collections.CONTACT_COLLECTION)
                .insertOne(data)
                .then((data) => {
                    resolve(data);
                });
        });
    },

    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.Password = await bcrypt.hash(userData.Password, 10);
            userData.Phone = null;
            userData.orders = [];
            userData.profile_completetion = false;
            userData.verificationStatus = false;
            userData.primaryAddress = {};
            userData.secondaryAddress = {};
            db.get()
                .collection(collections.USER_COLLECTION)
                .insertOne(userData)
                .then((data) => {
                    resolve(data);
                });
        });
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false;
            let response = {};
            let user = await db
                .get()
                .collection(collections.USER_COLLECTION)
                .findOne({ Email: userData.Email });
            if (user) {
                bcrypt
                    .compare(userData.Password, user.Password)
                    .then((status) => {
                        if (status) {
                            console.log("Login Success");
                            response.user = user;
                            response.status = true;
                            resolve(response);
                        } else {
                            console.log("Login Failed");
                            resolve({ status: false });
                        }
                    });
            } else {
                //console.log("User not found");
                resolve({ status: false });
            }
        });
    },

    getUserData: (userId) => {
        return new Promise((resolve, reject) => {
            //console.log(user);
            db.get()
                .collection(collections.USER_COLLECTION)
                .findOne({ _id: objectId(userId) })
                .then((user) => {
                    //console.log(response)
                    resolve(user);
                });
        });
    },

    updateUser: (data) => {
        return new Promise((resolve, reject) => {
            //console.log(user);
            primaryAddress = {
                AddressLine1: data.AddressLine1,
                AddressLine2: data.AddressLine2,
                City: data.City,
                District: data.District,
                State: data.State,
                ZipCode: data.ZipCode,
            };
            userData = {};
            userData.Phone = data.Phone;
            userData.primaryAddress = primaryAddress;
            userData.profile_completetion = data.profile_completetion;
            db.get()
                .collection(collections.USER_COLLECTION)
                .updateOne(
                    { Email: data.Email },
                    {
                        $set: userData,
                    }
                )
                .then((response) => {
                    //console.log(response)
                    resolve(response);
                });
        });
    },

    deleteUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(collections.USER_COLLECTION)
                .remove({ _id: objectId(userId) })
                .then((response) => {
                    resolve(response);
                });
        });
    },
};
