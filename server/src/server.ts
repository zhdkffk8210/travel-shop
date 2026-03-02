import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { seedProducts } from "./seed/products.seed.js";

async function bootstrap(): Promise<void> {
  try {
    // 1️⃣ DB 연결
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    // 2️⃣ Seed 실행
    await seedProducts();

    // 3️⃣ Express 앱 생성
    const app = createApp();

    // 4️⃣ 서버 실행
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
}


bootstrap();