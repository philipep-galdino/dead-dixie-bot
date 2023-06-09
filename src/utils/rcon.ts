import { Rcon } from 'rcon-client';
import { TextChannel } from 'discord.js';

import { generatePassword } from './passwordGenerator';

export function getRconConfig() {
  return {
    host: process.env.RCON_IP_ADDRESS ?? '',
    port: parseInt(process.env.RCON_PORT ?? ''),
    password: process.env.RCON_PASSWORD ?? '',
  };
}

async function connectRconWithRetry(rcon: Rcon, retries = 5, delay = 5000, backoffFactor = 2): Promise<void> {
  while (retries) {
    try {
      await rcon.connect();
      console.log('Rcon connected.');
      return; // success, exit the loop
    } catch (error) {
      console.error('Error connecting to Rcon:', error);
      retries--;
      if (retries) {
        console.log(`Retrying in ${delay / 1000} seconds (${retries} retries left)...`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // wait before retrying
        delay *= backoffFactor; // increase delay for next retry
      }
    }
  }
  throw new Error('Failed to connect to Rcon after all retries.');
}

export async function addWhitelistUser(user: string, channel: TextChannel, retries = 5): Promise<string> {
  const rcon = new Rcon({...getRconConfig(), timeout: 10000});
  const generatedPassword = generatePassword();

  await connectRconWithRetry(rcon);

  while (retries) {
    try {
      const response = await rcon.send(`adduser ${user} ${generatedPassword}`);

      channel.send(`User ${user} added to the whitelist.`);

      console.log({ response })

      break; // success, exit the loop
    } catch (error) {
      console.error('Error while adding user to whitelist:', error);
      retries--;
      if (retries) {
        console.log(`Retrying in 5 seconds (${retries} retries left)...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
      }
    } finally {
      rcon.end();
    }
  }

  return generatedPassword;
}

export async function removeWhitelistUser(user: string, retries = 5): Promise<void> {
  const rcon = new Rcon({...getRconConfig(), timeout: 10000});

  await connectRconWithRetry(rcon);

  while (retries) {
    try {
      await rcon.send(`removeuserfromwhitelist ${user}`);
      break; // success, exit the loop
    } catch (error) {
      console.error('Error while removing user from whitelist:', error);
      retries--;
      if (retries) {
        console.log(`Retrying in 5 seconds (${retries} retries left)...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
      }
    } finally {
      rcon.end();
    }
  }
}

export async function getServerInfo(retries = 5): Promise<{ playerCount: number }> {
  const rcon = new Rcon({...getRconConfig(), timeout: 10000});

  await connectRconWithRetry(rcon);

  while (retries) {
    try {
      const playerCountString = await rcon.send('players');

      const playerCountMatch = playerCountString.match(/\((\d+)\)/);
      const playerCount = playerCountMatch ? parseInt(playerCountMatch[1], 10) : 0;
      
      return { playerCount };
    } catch (error) {
      console.error('Error while getting server info:', error);
      retries--;
      if (retries) {
        console.log(`Retrying in 5 seconds (${retries} retries left)...`);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before retrying
      }
    } finally {
      rcon.end();
    }
  }

  return { playerCount: 0 }; // fallback value
}
