const express = require('express')
const router = express.Router()

const Site = require('../models/Site')
const auth = require('../middleware/auth')

router.get('/sites', async (req,res) => {
    try {
        const {page=1 , limit=20} = req.query
        
        const listSite = await Site.find().limit(limit).skip((page - 1) * limit)
        const count = await Site.countDocuments()
        const totalPages = Math.ceil(count / limit)
        
        res.status(200).send({listSite, totalPages, currentPage: page})
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/sites', auth , async (req,res) =>{
    try {
        const site = new Site(req.body)
        await site.save()
        res.status(201).send(site)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/sites/:id', auth , async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','description','contrat','minimumInvest','minimumWithdrawal','createdAt']
    const isAllowed = updates.every(update => allowedUpdate.includes(update))

    if(!isAllowed){
        res.status(400).send({ 'error' : 'Update\'s not valid'  })
    }

    try {
        const site = await Site.findOne({ _id: req.params.id })
        if(!site){
            res.status(404).send({'error': 'Site not found'})
        }    
        updates.forEach(update => {
            site[update] = req.body[update]
        });

        await site.save()

        res.send(site)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/sites/:id', auth , async (req,res) => {
    try {
        const site = await Site.findOneAndDelete({ _id: req.params.id})
        res.send(site)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router