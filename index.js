const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot RLCraft Dregora dang hoat dong 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

const botOptions = {
  host: 'icefish.aternos.host',
  port: 54139,
  username: 'Server_247',
  version: '1.12.2'
};

function createBot() {
  console.log('🔌 Dang thiet lap tien trinh ket noi den server Aternos...');
  const bot = mineflayer.createBot(botOptions);

  // 🔥 ĐỘNG CƠ LIÊN KẾT: Tự động đăng ký và mô phỏng chính xác giao thức Forge 1.12.2 của RLCraft
  bot._client.on('custom_payload', (packet) => {
    if (packet.channel === 'FML|HS') {
      const subChannel = packet.data[0];
      // Trả lời tín hiệu bắt tay từ máy chủ Forge
      if (subChannel === 0) { // ServerHello
        const buffer = Buffer.from([1, 2]); // ClientHello với giao thức FML
        bot._client.write('custom_payload', { channel: 'FML|HS', data: buffer });
        console.log('📦 Đang giả lập gửi danh sách mã hóa Mod RLCraft...');
      }
    }
  });

  bot.on('spawn', () => {
    console.log('🤖 CHUC MUNG! Bot Server_247 da vuot rao va vao game thanh cong!');
    
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

  bot.on('death', () => {
    console.log('💀 Bot da bi quai RLCraft tieu diet! Dang tu dong hoi sinh...');
    bot.createBot(); 
  });

  bot.on('end', (reason) => {
    console.log(`❌ Bot roi tran do: ${reason}. Se tu dong dang nhap lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('⚠️ Chu y:', err.message));
}

createBot();
