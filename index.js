const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render và UptimeRobot kết nối mượt mà
app.get('/', (req, res) => res.send('Bot Minecraft dang hoat dong online 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

// ================= CẤU HÌNH BOT MINECRAFT MỚI CỦA BẠN =================
const botOptions = {
  host: '51.161.208.84',           // 🌟 ĐÃ ĐỔI: IP server mới
  port: 4770,                      // 🌟 ĐÃ ĐỔI: Port server mới
  username: 'Server_247',          // Tên nhân vật của Bot
  version: '1.21.11',               // Phiên bản Minecraft
  viewDistance: 'tiny'             // Giảm tầm nhìn để tiết kiệm RAM
};
// =====================================================================

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('🤖 Bot Server_247 da vao server Minecraft moi thanh cong!');
    
    // 🔥 CẬP NHẬT: Cứ mỗi 30 giây (30000ms), bot tự LÙI -> NHẢY -> TIẾN
    setInterval(() => {
      if (bot && bot.entity) {
        console.log('🚶 Bot dang thuc hien hanh dong anti-afk...');
        
        // 1. Lùi lại
        bot.setControlState('back', true);
        
        setTimeout(() => {
          bot.setControlState('back', false);
          
          // 2. Nhảy lên
          bot.setControlState('jump', true);
          
          setTimeout(() => {
            bot.setControlState('jump', false);
            
            // 3. Tiến lên lại vị trí cũ
            bot.setControlState('forward', true);
            
            setTimeout(() => {
              bot.setControlState('forward', false);
              console.log('✅ Bot da ve lai vi tri cu.');
            }, 300);
            
          }, 200);
          
        }, 300);
      }
    }, 30000); // 🌟 ĐÃ ĐỔI: 30000ms = 30 giây
  });

  // Tự động hồi sinh khi chết
  bot.on('death', () => {
    console.log('💀 Bot da bi chet! Dang tu dong hoi sinh...');
    bot.createBot(); 
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
