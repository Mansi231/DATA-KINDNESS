import asyncHandler from 'express-async-handler'
import Lead from '../schema/Lead.js'

const getLeads = asyncHandler(async (req, res) => {
    Lead.find().then((data) => {
        return res.status(200).json({ data })
    }).catch((error) => {
        return res.status(500).json({ error: error?.message })
    })
})

const addLead = asyncHandler(async (req, res) => {
    let { amount, price } = req?.body
    if (!amount || !price) return res.status(403).json({ error: 'price or lead amount is missing' })
    let lead = new Lead ({ amount, price ,label:price})
    lead.save().then((c) => {
        return res.status(200).json(c)
    }).catch((error) => {
        return res.status(500).json({ error: error?.message })
    })
})
   
export { getLeads, addLead }