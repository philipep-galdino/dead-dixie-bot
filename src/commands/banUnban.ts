import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';


const banUnban: Command = {
    name: 'banunban',
    description: 'Ban or unban a user.',
    execute: async (message: Message, args: string[]) => {
    const action = args[0];
    const player = args[1];
    const reason = args.slice(2).join(' ') || 'No reason provided.';

    if (!action || !player) {
        message.channel.send('Please provide an action (ban or unban) and a player name.');
        return;
    }

    const rcon = new Rcon(getRconConfig());
    await rcon.connect();

    try {
        if (action === 'ban') {
        await rcon.send(`/banuser "${player}" -r "${reason}"`);
        message.channel.send(`Banned ${player} for: ${reason}`);
        } else if (action === 'unban') {
        await rcon.send(`/unbanuser "${player}"`);
        message.channel.send(`Unbanned ${player}.`);
        } else {
        message.channel.send('Invalid action. Use either "ban" or "unban".');
        }
    } catch (error) {
        console.error('Error executing Rcon command:', error);
        message.channel.send('Error executing the command.');
    } finally {
        await rcon.end();
    }
    },
};
  
export default banUnban;