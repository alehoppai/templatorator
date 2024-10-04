import { Router } from "express";

const r = Router()

r.get('/', (req, res) => res.send("Hello from new app"))

export default r
