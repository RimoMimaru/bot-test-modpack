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
  version: '1.21.11',                  // Phiên bản tối ưu cho KingMC
  viewDistance: 'tiny'                // Giảm tầm nhìn để tiết kiệm RAM
};
// =====================================================================

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('🤖 Bot Noshava da vao server kingmc.vn thanh cong!');
    
    // 🛠️ ĐÃ SỬA: Thay đổi từ lệnh /register và /login thành lệnh viết tắt /dk và /dn
    setTimeout(() => {
       bot.chat('/dk Thuan123@ Thuan123@');
       console.log('📝 Đã gửi lệnh đăng ký viết tắt (/dk).');

       // Chờ thêm 1.5 giây sau khi đăng ký rồi thực hiện đăng nhập để chắc chắn thành công
       setTimeout(() => {
          bot.chat('/dn Thuan123@');
          console.log('🔑 Đã gửi lệnh đăng nhập viết tắt (/dn).');
       }, 1500);

    }, 2000); // Gửi lệnh sau khi vào server 2 giây
  });

  // Tự động hồi sinh khi chết
  bot.on('death', () => {
    console.log('💀 Bot da bi chet! Dang tu dong hoi sinh...');
    bot.respawn(); 
  });

  // Tự động kết nối lại nếu server bị restart hoặc bot bị đá
  bot.on('end', (reason) => {
    console.log(`❌ Bot bi mat ket noi do: ${reason}. Dang thu vao lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Phat hien loi Bot nhung da duoc tu dong bo qua:', err.message);
  });
}

// Kích hoạt chạy bot bảo mật
createBot();
