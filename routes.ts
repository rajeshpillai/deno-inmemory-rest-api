import { Router }from 'https://deno.land/x/oak/mod.ts'
import { 
    getShapes, getShape, addShape, 
    updateShape, deleteShape 
} from './controller.ts'

const router = new Router()
router.get('/shapes', getShapes)
      .get('/shapes/:id', getShape)
      .post('/shapes', addShape)
      .put('/shapes/:id', updateShape)
      .delete('/shapes/:id', deleteShape)

export default router