"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const NotAuthorized_1 = require("../error/NotAuthorized");
const requireAuth = (req, res, next) => {
    if (!req.currentUser)
        throw new NotAuthorized_1.NotAuthorized();
    next();
};
exports.requireAuth = requireAuth;
