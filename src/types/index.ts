import { Client, ClientOptions, Collection, Message } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: (message: Message, args: string[], client: ExtendedClient) => void | Promise<void>;
}

export interface Event {
  name: string;
  execute: (client: ExtendedClient, ...args: any[]) => void | Promise<void>;
  once?: boolean;
}

export class ExtendedClient extends Client {
  commands: Collection<string, Command>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
  