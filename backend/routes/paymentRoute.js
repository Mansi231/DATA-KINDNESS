import express from 'express'
import { addPayment } from '../controller/paymentController.js'

const router = express.Router()

router.route('/').post(addPayment)

export default router 