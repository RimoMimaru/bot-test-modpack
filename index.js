const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot RLCraft Dregora dang hoat dong 24/7!'));
app.listen(PORT, () => console.log(`Web server dang chay tren cong ${PORT}`));

const botOptions = {
  host: '51.161.208.84',
  port: 4770,
  username: 'Server_247',
  version: '1.12.2' // RLCraft Dregora chay tren nen 1.12.2
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  // Tự động kích hoạt luồng bắt tay Forge tích hợp sẵn của Mineflayer
  bot._client.once('custom_payload', (packet) => {
    if (packet.channel === 'FML|HS') {
      console.log('📦 Dang thuc hien gui goi tin gia lap Forge Mods...');
    }
  });

  bot.on('spawn', () => {
    console.log('🤖 Bot Server_247 da ket noi vao Server RLCraft Dregora!');
    
    // Hanh dong di chuyen chong kick AFK 30 giay
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

  bot.on('error', (err) => console.log('⚠️ Loi he thong:', err.message));
}

createBot();
