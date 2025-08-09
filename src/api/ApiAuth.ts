// src/api/ApiAuth.ts
// Mẫu APIAuth cho xác thực người dùng
import { fetcher } from "./Fetcher";

const ApiAuth = {
  async getMe() {
    // Gọi API lấy thông tin user
    return fetcher<any>({ url: "/me", method: "get" });
  },
};

export default ApiAuth;
