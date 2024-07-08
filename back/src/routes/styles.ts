import {Hono} from 'hono'
import {Style} from '../models/styles'
import {isValidObjectId} from 'mongoose'

const api = new Hono().basePath('/styles')

api.get('/', async (c) => {
    return c.json(await Style.find());
})

api.get('/:id', async (c) => {
    const _id = c.req.param('id')

    if (isValidObjectId(_id)) {
        const oneStyle = await Style.findOne({_id})
        return c.json(oneStyle)
    }
    return c.json({msg: 'ObjectId malformed'}, 400)
})

api.post('/', async (c) => {
    const body = await c.req.json()
    try {
        const newStyle = new Style(body)
        const saveStyle = await newStyle.save()
        return c.json(saveStyle, 201)
    } catch (error: any) {
        return c.json(error._message, 400)
    }
})

api.put('/:id', async (c) => {
    const _id = c.req.param('id')
    const body = await c.req.json()
    const q = {
        _id
    }
    const updateQuery = {
        ...body
    }
    const tryToUpdate = await Style.findOneAndUpdate(q, updateQuery, {new: true})
    return c.json(tryToUpdate, 200)
})

api.patch('/:id', async (c) => {
    const _id = c.req.param('id')
    const body = await c.req.json()
    const q = {
        _id
    }
    const {categories, ...rest} = body

    const updateQuery = {
        $addToSet: {
            categories: categories
        },
        $set: {...rest}
    }
    const tryToUpdate = await Style.findOneAndUpdate(q, updateQuery, {new: true})
    return c.json(tryToUpdate, 200)

})

api.delete('/:id', async (c) => {
    const _id = c.req.param('id')
    const tryToDelete = await Style.deleteOne({_id})
    const {deletedCount} = tryToDelete
    if (deletedCount) {
        return c.json({msg: "DELETE done"})
    }
    return c.json({msg: "not found"}, 404)

})

export default api