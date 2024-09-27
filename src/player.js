import { Player } from 'discord-player';
import { YoutubeiExtractor } from 'discord-player-youtubei';

let player;

export const initPlayer = async (client) => {
  player = new Player(client);
  
  if (player) player.extractors.register(YoutubeiExtractor, {})
    player.events.on('playerStart',(queue)=>{
  queue.node.setVolume(30)
  queue.setRepeatMode(2)
    })
    player.events.on('audioTrackAdd', (queue, track) => {
      if (queue.metadata && queue.metadata.channel && queue.isPlaying()) {
        queue.metadata.channel.send(`Se ha agregado a la cola **${track.cleanTitle}**!`);
      }
    });

  player.on('error', (error) => {
    console.error('Player error:', error);
    if (error.metadata && error.metadata.channel) {
      error.metadata.channel.send(`Ocurrió un error en el reproductor: ${error.message}`);
    }
  });
};



export const getPlayer = () => {
  if (!player) throw new Error("Player not initialized. Call initPlayer first.");
  return player;
};
