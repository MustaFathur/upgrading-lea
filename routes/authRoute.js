const express = require('express')
const { register, login, logout, protectedRoute } = require('../controllers/authController')
const { verifyToken } = require('../middleware/authMiddleware')

const authRouter = express.Router()

authRouter.post('/auth/register', register);
authRouter.post('/auth/login', login);
authRouter.post('/auth/logout', verifyToken, logout);
authRouter.get('/auth/protected', verifyToken, protectedRoute);

module.exports = authRouter;