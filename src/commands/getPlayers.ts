// commands/players.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const players: Command = {
    name: 'players',
    description: 'Lista todos os usuários conectados!',
    execute: async (message: Message) => {
        console.log('yeoba')
        const requiredRoleID = '1085755248557162578';

        if (!message.member) {
            message.channel.send('Este comando só pode ser utilizado dentro do Servidor do Discord.');
            return;
        }

        if (!message.member.roles.cache.has(requiredRoleID)) {
            message.channel.send(`Você precisa ser um Game Master ou + para utilizar esse comando, trouxa.`);
            return;
        }

        const rcon = new Rcon(getRconConfig());
        await rcon.connect();

        try {
            const response = await rcon.send('players');
            message.channel.send(`Jogadores online: ${response}`);
        } catch (error) {
            console.error('Error executing Rcon command:', error);
            message.channel.send('Error executing the command.');
        } finally {
            await rcon.end();
        }
    },
};

export default players;
