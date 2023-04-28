import { Intents } from 'discord.js';
import { config } from 'dotenv';
import { registerCommands, registerEvents } from './utils';
import { ExtendedClient } from './types';

const env = config();

const client = new ExtendedClient({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

registerCommands(client, '../commands');
registerEvents(client, '../events');

client.login(process.env.BOT_TOKEN);
