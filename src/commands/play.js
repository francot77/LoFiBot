import { useMainPlayer } from 'discord-player';

import Discord from 'discord.js';

export default {
  data: new Discord.SlashCommandBuilder()
    .setName('play')
    .setDescription('Inicia el reproductor')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('Cancion que quieras escuchar')
        .setMinLength(3)
        .setMaxLength(100)
    ),
  execute: async (interaction) => {
    if (!interaction.inCachedGuild()) return;
    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;
    const consulta = interaction.options.getString('query', true);
    await interaction.deferReply();

    const query = await player.search(consulta, {
      requestedBy: interaction.user,
    });

    if (!query.hasTracks()) {
      return interaction.editReply("Error: No hay canción.");
    }

    try {
      if (!channel) {
        return interaction.editReply("Debes estar en un canal de voz para reproducir");
      }
      await player.play(channel, query, {
        nodeOptions: {
          metadata: interaction,
        }
      });
      await interaction.editReply("LoFi Bot Iniciado")
      

    } catch (e) {
      console.error(e);
      return interaction.editReply("Error al reproducir la canción.");
    }
  },
};
