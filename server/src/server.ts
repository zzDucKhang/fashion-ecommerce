import { createServer } from "http";
import { createApp } from "./app";
import { envConfig } from "./config/env.config";
import { redisClient } from "./database/redis";
import { prisma } from './database/prisma'
import { initWebSocket, closeWebSocket } from "./common/websocket";
import { startVoucherReconciliationCron } from "./modules/loyalty-engage/voucher/voucher.worker";

async function bootstrap() {
  const app = createApp();
  const httpServer = createServer(app);

  // Kết nối Socket.io với Redis Pub/Sub adapter (Multi-Node K8s Scaling)
  initWebSocket(httpServer);

  // Khởi chạy cronjob đồng bộ hóa voucher định kỳ hàng đêm lúc 2:00 AM
  startVoucherReconciliationCron();

   const server = httpServer.listen(envConfig.PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${envConfig.PORT}`)
  })

  // Xử lý Graceful Shutdown
  const handleShutdown = async (signal: string) => {
    console.log(`\nNhận tín hiệu ${signal}. Đang đóng server...`);

    server.close(async () => {
      console.log("HTTP Server đã đóng.");
      await closeWebSocket();
      await prisma.$disconnect();
      console.log("Prisma đã ngắt kết nối.");
      redisClient.disconnect();
      console.log("Redis đã ngắt kết nối.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => handleShutdown("SIGINT"));
  process.on("SIGTERM", () => handleShutdown("SIGTERM"));
}

bootstrap().catch((err) => {
  console.error("Không thể khởi động ứng dụng:", err);
  process.exit(1);
});
