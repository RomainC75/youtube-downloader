import {Router} from 'express'
import videoRouter from './video/video.router'
import sseRouter from './sse/sse.router'
import uploadRouter from './upload/upload.router'

const router = Router()

router.use('/video',videoRouter)

router.use('/sse', sseRouter)

router.use('/upload', uploadRouter)

export default router