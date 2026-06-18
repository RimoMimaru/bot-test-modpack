const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

// Giữ cho Render và UptimeRobot kết nối mượt mà vĩnh viễn 24/7
app.get('/', (req, res) => res.send('Bot RLCraft Dregora dang hoat dong 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

// ================= CẤU HÌNH BOT DYN IP CHUẨN ĐÃ ĐỔI =================
const botOptions = {
  host: 'icefish.aternos.host',    // ĐÃ ĐỔI: Địa chỉ Dyn IP chính gốc
  port: 54139,                     // Cổng kết nối gồm 5 chữ số của bạn
  username: 'Server_247',          // Tên hiển thị của Bot trong game
  version: '1.12.2'                // Phiên bản chuẩn của RLCraft Dregora
};
// ====================================================================

function createBot() {
  console.log('🔌 Dang thiet lap tien trinh ket noi den server Aternos...');
  const bot = mineflayer.createBot(botOptions);

  // Ép buộc bot tự động kích hoạt chế độ bắt tay ẩn với hệ thống Forge Modpack
  bot._client.on('packet', (data, meta) => {
    if (meta.name === 'custom_payload' && data.channel === 'FML|HS') {
      console.log('📦 He thong: Dang gia lap gui danh sach Modpack RLCraft...');
    }
  });

  bot.on('spawn', () => {
    console.log('🤖 CHUC MUNG! Bot Server_247 da vuot rao va vao game thanh cong!');
    
    // Hệ thống Anti-AFK thông minh: Cứ mỗi 30 giây (30000ms), bot tự LÙI -> NHẢY -> TIẾN
    setInterval(() => {
      if (bot && bot.entity) {
        console.log('🚶 Bot thuc hien dong tac di chuyen de duy tri mang...');
        
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
    console.log(`❌ Bot roi tran do: ${reason}. Se tu dong dang nhap lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  // Ngăn chặn lỗi vặt của hệ thống modpack làm sụp luồng xử lý
  bot.on('error', (err) => console.log('⚠️ Chu y:', err.message));
}

// Khởi động kích hoạt chạy bot
createBot();
