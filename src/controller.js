

import { useMainPlayer } from 'discord-player';

export const handleInteraction = async (interaction) => {
  if (!interaction.isButton()) return;

  const player = useMainPlayer();
  let queue = player.nodes.get(interaction.guildId);
  if (!queue) {
    queue = player.nodes.create(interaction.guild, {
      metadata: interaction.channel,
    });
  }
  
  if (!queue || !queue.isPlaying()) {
    return interaction.reply({ content: 'No hay ninguna canción reproduciéndose.', ephemeral: true });
  }
  if (!interaction.guild) return;

};
