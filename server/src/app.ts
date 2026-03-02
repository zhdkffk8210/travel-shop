import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export function createApp() {
  const app = express();

  // JSON 요청 파싱
  app.use(express.json());

  // CORS 허용 (프론트 연동 대비)
  app.use(cors());

  // 서버 상태 확인용
  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  // API 라우터 연결
  app.use("/api", apiRouter);

  // 에러 핸들러 (항상 마지막에)
  app.use(errorHandler);

  return app;
}