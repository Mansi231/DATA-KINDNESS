import express from 'express'
import { addBusinessCategory, getBusinessCategories } from '../controller/categoryController.js'

const router = express.Router()

router.route('/').get(getBusinessCategories).post(addBusinessCategory)

export default router