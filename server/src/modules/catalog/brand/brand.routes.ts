import { Router } from "express";
import { BrandController } from "./brand.controller";

import {
  getBrandQuerySchema,
  getBrandParamsSchema,
  createBrandBodySchema,
  updateBrandBodySchema,
  upsertBrandTranslationSchema,
} from "./brand.schema";
import { z } from "zod";
import { validateRequest } from "@/middlewares/pipes/validate.pipe";

export const brandRouter = Router();
const controller = new BrandController();

// Gắn validator để Zod tự điền page=1, limit=10
brandRouter.get(
  "/",
  validateRequest({ query: getBrandQuerySchema }),
  controller.list,
);

brandRouter.get(
  "/:brandId",
  validateRequest({ params: getBrandParamsSchema }),
  controller.findById,
);

brandRouter.post(
  "/",
  validateRequest({ body: createBrandBodySchema }),
  controller.create,
);

brandRouter.put(
  "/:brandId",
  validateRequest({
    params: getBrandParamsSchema,
    body: updateBrandBodySchema,
  }),
  controller.update,
);

brandRouter.delete(
  "/:brandId",
  validateRequest({ params: getBrandParamsSchema }),
  controller.delete,
);

brandRouter.put(
  "/:brandId/translations/:languageId",
  validateRequest({
    params: getBrandParamsSchema.extend({ languageId: z.string().min(2) }),
    body: upsertBrandTranslationSchema,
  }),
  controller.upsertTranslation,
);