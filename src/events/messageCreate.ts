import { Event, ExtendedClient } from '../types';
import { Message } from 'discord.js';

const messageCreate: Event = {
  name: 'messageCreate',
  execute: async (client: ExtendedClient, message: Message) => {
    if (message.author.bot || !message.guild) return;

    const prefix = '/';

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
      await command.execute(message, args, client);
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  },
};

export default messageCreate;
