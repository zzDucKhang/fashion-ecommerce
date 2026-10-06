// src/modules/loyalty-engage/point/point.controller.ts
import { NextFunction, Request, Response } from "express";
import { PointService } from "./point.service";

export class PointController {
  constructor(private pointService = new PointService()) {}

  /** POST /points/earn – Admin/Service cộng điểm sau khi đơn giao thành công */
  earnPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Bỏ việc truyền req.user!.userId, service sẽ tự lấy userId từ chính orderId
      const data = await this.pointService.earnPoints(req.body);
      return res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
      next(error);
    }
  };

  /** POST /points/redeem – User dùng điểm thanh toán */
  redeemPoints = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const data = await this.pointService.redeemPoints(userId, req.body);
      return res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
      next(error);
    }
  };

  /** GET /points/history – Lịch sử giao dịch điểm */
  getHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const data = await this.pointService.getHistory(userId, req.query as any);
      return res.status(200).json({ statusCode: 200, ...data });
    } catch (error) {
      next(error);
    }
  };

  /** GET /points/balance – Số điểm hiện tại */
  getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const data = await this.pointService.getBalance(userId);
      return res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  };
}
