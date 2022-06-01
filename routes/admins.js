var express = require("express");
var router = express.Router();
var adminHelper = require("../helpers/adminHelper");
var functionHelper = require("../helpers/functionHelper");

var websiteName = "Website Name";

/* GET dashboard listing. */
router.get("/", function (req, res, next) {
    res.render("admin/dashboard", {
        title: `Admin | ${websiteName}`,
        isAdmin: true,
        isDashboardPage: true,
    });
});

/* GET dashboard listing. */
router.get("/dashboard", function (req, res, next) {
    res.render("admin/dashboard", {
        title: `Admin | ${websiteName}`,
        isAdmin: true,
        isDashboardPage: true,
    });
});

/* GET Messages. */
router.get("/messages", function (req, res, next) {
    res.render("admin/messages", {
        title: `Admin | ${websiteName}`,
        isAdmin: true,
        isMessagesPage: true,
    });
});

/* GET Admins. */
router.get("/admins", function (req, res, next) {
    res.render("admin/admins/admins", {
        title: `Admin | ${websiteName}`,
        isAdmin: true,
        isAdminsPage: true,
    });
});

/* GET Admins. */
router.get("/profile", function (req, res, next) {
    res.render("admin/profile", {
        title: `Admin | ${websiteName}`,
        isAdmin: true,
        isAdminsPage: true,
    });
});

module.exports = router;
