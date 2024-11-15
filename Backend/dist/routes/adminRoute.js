"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/adminlogin", adminController_1.adminLogin);
exports.default = adminRouter;
