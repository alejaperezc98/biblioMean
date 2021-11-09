import express from "express";
import proveedor from "../controllers/proveedor.js";

const router= express.Router()

router.post("/registerProveedor", proveedor.registerProveedor);
router.get("/listProveedor", proveedor.listProveedor);
router.get("/findProveedor/:_id", proveedor.findProveedor);
router.put("/updateProveedor", proveedor.updateProveedor);
router.delete("/deleteProveedor/:_id", proveedor.deleteProveedor);

export default router