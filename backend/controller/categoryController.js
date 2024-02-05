import asyncHandler from 'express-async-handler'
import Category from '../schema/Category.js'

const getBusinessCategories = asyncHandler(async (req, res) => {
    Category.find().then((category)=>{
        return res.status(200).json({category})
    }).catch((error)=>{
        return res.status(500).json({ error: error?.message })
    })
})

const addBusinessCategory = asyncHandler(async (req, res) => {

    console.log(req?.body);
    let {category_name} = req?.body
    if(!category_name) return res.status(403).json({ error: 'category name is required.'})
    let category = new Category({category_name})
    category.save().then((c)=>{
        return res.status(200).json(c)
    }).catch((error)=>{
        return res.status(500).json({ error: error?.message })
    })
})

export { getBusinessCategories,addBusinessCategory }