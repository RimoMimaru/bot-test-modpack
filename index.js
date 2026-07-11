const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render và UptimeRobot kết nối mượt mà
app.get('/', (req, res) => res.send('Bot Minecraft dang hoat dong online 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

// ================= CẤU HÌNH BOT MINECRAFT MỚI CỦA BẠN =================
const botOptions = {
  host: 'kingmc.vn',                  // IP server KingMC
  port: 25565,                        // Cổng mặc định
  username: 'Noshava',                // Tên nhân vật của Bot
  version: '1.21.11',                  // Thử nghiệm với 1.20.1 (Có thể đổi thành '1.20.4' hoặc '1.19.4' nếu vẫn treo)
  viewDistance: 'tiny',               // Giảm tầm nhìn để tiết kiệm RAM
  connectTimeout: 10000               // 🛠️ THÊM: Quá 10 giây không kết nối được sẽ tự hủy để kết nối lại
};
// =====================================================================

function createBot() {
  console.log('🔄 Đang gửi yêu cầu kết nối đến kingmc.vn...');
  const bot = mineflayer.createBot(botOptions);

  // 🛠️ THÊM: Cơ chế chống treo vô hạn (Giúp nhận biết nếu bị chặn IP)
  const connectionTimeout = setTimeout(() => {
    console.log('⚠️ Kết nối bị treo quá lâu (Có thể do KingMC chặn IP của Render). Đang tiến hành kết nối lại...');
    bot.end('timeout');
  }, 15000);

  bot.on('spawn', () => {
    clearTimeout(connectionTimeout); // Xóa bộ đếm thời gian treo khi vào game thành công
    console.log('🤖 Bot Noshava da vao server kingmc.vn thanh cong!');
    
    // Tự động gửi lệnh đăng ký và đăng nhập viết tắt
    setTimeout(() => {
       bot.chat('/dk Thuan123@ Thuan123@');
       console.log('📝 Đã gửi lệnh đăng ký viết tắt (/dk).');

       setTimeout(() => {
          bot.chat('/dn Thuan123@');
          console.log('🔑 Đã gửi lệnh đăng nhập viết tắt (/dn).');
       }, 1500);

    }, 2000);
  });

  bot.on('death', () => {
    console.log('💀 Bot da bi chet! Dang tu dong hoi sinh...');
    bot.respawn(); 
  });

  bot.on('end', (reason) => {
    clearTimeout(connectionTimeout);
    console.log(`❌ Bot bi mat ket noi do: ${reason}. Dang thu vao lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    clearTimeout(connectionTimeout);
    console.log('⚠️ Phát hiện lỗi kết nối:', err.message);
  });
}

// Kích hoạt chạy bot bảo mật
createBot();
