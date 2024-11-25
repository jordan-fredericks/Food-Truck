
const router = require('express').Router()

const { getCollection, ObjectId } = require('../../../db-connection')

const getFoodTruck = getCollection('Food-Truck')
const getEvents = getFoodTruck('Events')
const getMenu = getFoodTruck('Menu')

router.get('/menu', async (_, response) => {
    const collection = await getMenu()
    const menu = await collection.find({}).toArray()
    response.send(menu)
})

router.get('/events', async (_, response) => {
    const collection = await getEvents()
    const events = await collection.find({}).toArray()
    response.send(events)
})

router.get('/menu/:id', async (request, response) => {
    const { id } = request.params

    const collection = await getMenu()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    //const found = await collection.findOne({ name: "Mac & Cheese" })

    if(!found) response.send({ error: `Cannot find menu item id: ${id}`})
    else response.send(found)
})

router.get('/events/:id', async (request, response) => {
    const { id } = request.params

    const collection = await getEvents()
    const found = await collection.findOne({ _id: new ObjectId(id) })

    if(!found) response.send({ error: `Cannot find event id: ${id}`})
    else response.send(found)
})

router.post('/menu', async (request, response) => {
    const { name, description, price, image } = request.body
    const collection = await getMenu()
    const result = await collection.insertOne({ name, description, price, image })
    response.send(result)
})

router.post('/events', async (request, response) => {
    const { name, location, date, time } = request.body
    const collection = await getEvents()
    const result = await collection.insertOne({ name, location, date, time })
    response.send(result)
})

module.exports = router