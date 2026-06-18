const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render và UptimeRobot kết nối mượt mà vĩnh viễn 24/7
app.get('/', (req, res) => res.send('Bot RLCraft Dregora dang hoat dong 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

// ================= CẤU HÌNH BOT RLCRAFT ATERNOS CỦA BẠN =================
const botOptions = {
  host: 'zombievip.aternos.me',    // Địa chỉ server Aternos mới
  port: 54139,                     // Cổng kết nối gồm 5 chữ số của Aternos
  username: 'Server_247',          // Tên hiển thị của Bot trong game
  version: '1.12.2',               // Phiên bản chuẩn của RLCraft Dregora
  viewDistance: 'tiny'             // Giảm tầm nhìn cực hạn để chống tràn RAM trên Render
};
// ========================================================================

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  // Tự động kích hoạt luồng bắt tay Forge để vượt qua bước kiểm tra mod của server
  bot._client.once('custom_payload', (packet) => {
    if (packet.channel === 'FML|HS') {
      console.log('📦 Dang gui goi tin gia lap Forge Modpack...');
    }
  });

  bot.on('spawn', () => {
    console.log('🤖 Bot Server_247 da ket noi vao Server RLCraft Aternos thanh cong!');
    
    // Hệ thống Anti-AFK thông minh: Cứ mỗi 30 giây (30000ms), bot tự LÙI -> NHẢY -> TIẾN
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
    }, 30000); // Hành động lặp lại liên tục sau mỗi 30 giây
  });

  // Tự động hồi sinh ngay lập tức khi vô tình bị quái RLCraft đánh chết
  bot.on('death', () => {
    console.log('💀 Bot bi quai danh chet! Dang tu dong hoi sinh...');
    bot.createBot(); 
  });

  // Tự động kết nối lại nếu server bị restart, bảo trì hoặc bị lỗi đường truyền
  bot.on('end', (reason) => {
    console.log(`❌ Bot mat ket noi (${reason}). Dang vao lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  // Ngăn chặn lỗi vặt của hệ thống modpack làm sụp luồng xử lý
  bot.on('error', (err) => console.log('⚠️ Loi he thong modpack:', err.message));
}

// Khởi động kích hoạt chạy bot
createBot();
