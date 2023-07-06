import {Router} from 'express'
import videoRouter from './video/video.router'
import sseRouter from './sse/sse.router'

const router = Router()

router.use('/video',videoRouter)

router.use('/sse', sseRouter)

export default router