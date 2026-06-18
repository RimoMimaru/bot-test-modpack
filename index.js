const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render và UptimeRobot kết nối mượt mà vĩnh viễn 24/7
app.get('/', (req, res) => res.send('Bot Minecraft Vanilla dang hoat dong 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

// ================= CẤU HÌNH BOT VANILLA CỦA BẠN =================
const botOptions = {
  host: 'NH1_MCSocial.aternos.me', // Địa chỉ server Vanilla mới của bạn
  port: 52367,                     // Port 5 chữ số của Aternos
  username: 'Server_247',          // Tên nhân vật của Bot trong game
  version: '1.21.1'                // Phiên bản chuẩn 1.21.1
};
// ================================================================

function createBot() {
  console.log('🔌 Dang thiet lap tien trinh ket noi den server Vanilla...');
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('🤖 CHUC MUNG! Bot Server_247 da vao server Vanilla thanh cong!');
    
    // Hệ thống Anti-AFK di chuyển: Cứ mỗi 30 giây (30000ms), bot tự LÙI -> NHẢY -> TIẾN
    setInterval(() => {
      if (bot && bot.entity) {
        console.log('🚶 Bot thuc hien dong tac di chuyen de duy tri mang...');
        
        bot.setControlState('back', true);
        setTimeout(() => {
          bot.setControlState('back', false);
          bot.setControlState('jump', true);
          setTimeout(() => {
            bot.setControlState('jump', false);
            bot.setControlState('forward', true);
            setTimeout(() => bot.setControlState('forward', false), 300);
          }, 200);
        }, 300);
      }
    }, 30000);
  });

  // Tự động hồi sinh ngay lập tức khi vô tình bị quái đánh chết
  bot.on('death', () => {
    console.log('💀 Bot da bi quai tieu diet! Dang tu dong hoi sinh...');
    bot.createBot(); 
  });

  // Tự động kết nối lại nếu server bị restart hoặc bảo trì
  bot.on('end', (reason) => {
    console.log(`❌ Bot roi tran do: ${reason}. Se tu dong dang nhap lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('⚠️ Loi he thong:', err.message));
}

// Khởi động kích hoạt chạy bot
createBot();
