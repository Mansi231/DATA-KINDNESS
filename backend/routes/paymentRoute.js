import express from 'express'
import { confirmPayment } from '../controller/paymentController.js'

const router = express.Router()

router.route('/confirm-payment').post(confirmPayment)

export default router 