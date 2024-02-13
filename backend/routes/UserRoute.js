import express from 'express'
 import { addUser, deletePaymentIntent } from '../controller/userController.js'

const router = express.Router()

router.route('/addUser').post(addUser)
router.post('/deletePaymentIntent',deletePaymentIntent)

export default router 