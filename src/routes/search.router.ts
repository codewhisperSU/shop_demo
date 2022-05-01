import express from "express";
import SearchController from "../controllers/search.controller";
import { SearchService } from "../services/search";
const router = express.Router();

router.get("/customerOrProductByName/:name", async (req: express.Request, res: express.Response, next) => {
    const controller = new SearchController(new SearchService());
    try{
        const response = await controller.searchCustomerOrProductByName(req.params.name);
        return res.send(response);
    }catch(error){
        next(error)
    }
})

export default router;