// commands/teleport.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const teleport: Command = {
    name: 'teleport',
    description: 'Teleporta um jogador para outro jogador. Utilize: /teleport "player1" "player2", ex /teleport "Legal" "Philipe"',
    execute: async (message: Message, args: string[]) => {
        const requiredRoleID = '1085755248557162578';

        if (!message.member) {
            message.channel.send('Este comando só pode ser utilizado dentro do Servidor do Discord.');
            return;
        }

        if (!message.member.roles.cache.has(requiredRoleID)) {
            message.channel.send(`Você precisa ser um Game Master ou + para utilizar esse comando, trouxa.`);
            return;
        }
        
        const player1 = args[0];
        const player2 = args[1];

        if (!player1 && !player2) {
            message.channel.send('Por favor, digite o nome dos usuários!');
            return;
        }

        const command = player2 ? `teleport "${player1}" "${player2}"` : `/teleport "${player1}"`;

        const rcon = new Rcon(getRconConfig());
        await rcon.connect();

        try {
            await rcon.send(command);
            message.channel.send(`Teleportou ${player1}${player2 ? ` para ${player2}` : ''}.`);
        } catch (error) {
            console.error('Error executing Rcon command:', error);
            message.channel.send('Error executing the command.');
        } finally {
            await rcon.end();
        }
    },
};

export default teleport;
