import { Collection } from 'discord.js';
import { Command, ExtendedClient } from '../types';
import fs from 'fs';
import path from 'path';

export function registerCommands(client: ExtendedClient, commandsFolder: string) {
  client.commands = new Collection();

  const commandFiles = fs.readdirSync(path.join(__dirname, commandsFolder)).filter((file) => file.endsWith('.ts'));

  for (const file of commandFiles) {
    const command: Command = require(path.join(__dirname, commandsFolder, file)).default;
    console.log(`Registering command: ${command.name}`);

    client.commands.set(command.name, command);
  }
}
