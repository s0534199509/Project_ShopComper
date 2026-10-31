import{Router} from 'express'
import{getAllProduct} from"../controllers/product.controller.js""
const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})
export default router