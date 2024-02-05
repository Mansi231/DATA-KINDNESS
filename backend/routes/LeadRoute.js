import express from 'express'
import { addLead, getLeads } from '../controller/leadController.js'

const router = express.Router()

router.route('/').get(getLeads).post(addLead)

export default router