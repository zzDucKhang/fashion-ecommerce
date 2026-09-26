import { Router } from "express";
import { BrandController } from "./brand.controller";

export const brandRouter = Router();
const controller = new BrandController();

brandRouter.get("/", controller.list);
brandRouter.get("/:brandId", controller.findById);
brandRouter.post("/", controller.create);
brandRouter.put(
  "/:brandId",

  controller.update,
);
brandRouter.delete("/:brandId", controller.delete);

// Route Translation khớp mô hình NestJS
brandRouter.put(
  "/:brandId/translations/:languageId",

  controller.upsertTranslation,
);
