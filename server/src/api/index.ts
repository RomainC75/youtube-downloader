import {Router} from 'express'
import videoRouter from './video/video.router'

const router = Router()

router.use('/video',videoRouter)

export default router