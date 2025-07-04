// src/api/ApiAuth.ts
// Mẫu APIAuth cho xác thực người dùng
import axios from "axios";

const ApiAuth = {
  async getMe() {
    // Gọi API lấy thông tin user, thay đổi URL cho phù hợp backend của bạn
    const res = await axios.get("/me");
    return res.data;
  },
};

export default ApiAuth;
