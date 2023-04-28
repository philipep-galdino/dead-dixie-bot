import { Event, ExtendedClient } from '../types';
import fs from 'fs';
import path from 'path';

export async function registerEvents(client: ExtendedClient, dir = ''): Promise<void> {
  const eventsFolder = dir || '../events';
  const eventFiles = fs.readdirSync(path.join(__dirname, eventsFolder)).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const event: Event = require(path.join(__dirname, eventsFolder, file)).default;
    if (event.once) {
      client.once(event.name, (...args: unknown[]) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args: unknown[]) => event.execute(client, ...args));
    }
  }
}
