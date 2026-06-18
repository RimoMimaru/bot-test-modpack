const express = require('express');
const mineflayer = require('mineflayer');
const forgeHandshake = require('minecraft-protocol-forge').forgeHandshake; // Gọi thư viện giả lập Forge
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot RLCraft Dregora dang hoat dong 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

const botOptions = {
  host: '51.161.208.84',
  port: 4770,
  username: 'Server_247',
  version: '1.12.2' // RLCraft Dregora chạy trên nền 1.12.2
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  // Kích hoạt tính năng tự động gửi gói tin giả lập Mod để qua mặt kiểm tra của Server
  forgeHandshake(bot.client, {
    forgeMods: [
      { modid: 'mcp', version: '9.42' },
      { modid: 'FML', version: '8.0.99.99' },
      { modid: 'forge', version: '14.23.5.2860' } // Phiên bản Forge chuẩn của RLCraft
    ]
  });

  bot.on('spawn', () => {
    console.log('🤖 Bot Server_247 da gia lap Mod va vao RLCraft thanh cong!');
    
    // Hành động di chuyển chống kick AFK (30 giây một lần)
    setInterval(() => {
      if (bot && bot.entity) {
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
    console.log('💀 Bot bi quai danh chet! Dang tu dong hoi sinh...');
    bot.createBot(); 
  });

  bot.on('end', (reason) => {
    console.log(`❌ Bot mat ket noi (${reason}). Dang vao lai sau 15 giay...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('⚠️ Loi he thong modpack:', err.message));
}

createBot();
