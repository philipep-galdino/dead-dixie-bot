import { Event } from '../types';
import { Client } from 'discord.js';
import { getServerInfo } from '../utils/rcon';

const updateInterval = 2 * 60 * 1000; // Update status every 5 minutes

const ready: Event = {
  name: 'ready',
  execute: (client: Client) => {
    if (client.user) {
      console.log(`Logged in as ${client.user.tag}`);

      const updateStatus = async () => {
        try {
          const { playerCount } = await getServerInfo();
          const playerText = playerCount === 1 ? 'jogador' : 'jogadores';
          client.user?.setActivity(`Dead Dixie: Ato I | ${playerCount} ${playerText}`, { type: 'PLAYING' });
        } catch (error) {
          console.error('Failed to update bot status:', error);
        }
      };
  
      updateStatus(); // Update the status immediately when the bot is ready
      setInterval(updateStatus, updateInterval); // Update the status periodically
    } else {
      console.log('Client user is not available.');
    }
  },
};

export default ready;
