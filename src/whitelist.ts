import { Command } from './types';
import { Message } from 'discord.js';
import { addWhitelistUser } from './utils/rcon';

const addWhitelist: Command = {
  name: 'addwhitelist',
  description: 'Add a user to the whitelist.',
  execute: async (message: Message, args: string[]) => {
    const user = args[0];

    try {
      await addWhitelistUser(user);
      message.channel.send(`User ${user} added to the whitelist.`);
    } catch (error) {
      console.error(error);
      message.channel.send('Error adding user to the whitelist.');
    }
  },
};

export default addWhitelist;
