import { Request, Response, NextFunction } from "express";
import { PaymentService } from "./payment.service";
import { UnauthorizedError } from "@/common/errors";

export class PaymentController {
  constructor(private paymentService = new PaymentService()) {}

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.paymentService.findAll(req.query as any);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = Number(req.params.paymentId);
      const data = await this.paymentService.findById(paymentId);
      return res.status(200).json({ statusCode: 200, data });
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number((req as any).user?.userId);
      if (!userId) throw new UnauthorizedError();
      const orderId = req.body.orderId as number;
      return res
        .status(201)
        .json({
          statusCode: 201,
          data: await this.paymentService.create(orderId, userId),
        });
    } catch (err) {
      next(err);
    }
  };

  sepay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawBody = req.body as Buffer;

      const signature = req.headers["x-sepay-signature"];
      const timestamp = req.headers["x-sepay-timestamp"];

      if (typeof signature !== "string") {
        return res.status(401).json({
          success: false,
          message: "Missing SePay signature",
        });
      }

      if (typeof timestamp !== "string") {
        return res.status(401).json({
          success: false,
          message: "Missing SePay timestamp",
        });
      }

      const valid = this.paymentService.verifySePaySignature(
        rawBody,
        signature,
        timestamp,
      );

      if (!valid) {
        return res.status(401).json({
          success: false,
          message: "Invalid SePay signature",
        });
      }
      
      let payload;
      try {
        payload = JSON.parse(rawBody.toString("utf8"));
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: "Payload is not a valid JSON",
        });
      }

      await this.paymentService.handleSePayWebhook(payload);

      return res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}
