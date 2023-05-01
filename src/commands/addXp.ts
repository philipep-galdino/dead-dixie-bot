// commands/addxp.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const addxp: Command = {
    name: 'addxp',
    description: 'Dá pontos de experiência em alguma habilidade para um jogador. Utilizee: /addxp "playername" perkname=xp, ex: addxp rj Woodwork=2',
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
        
        const player = args[0];
        const xp = args[1];

        if (!player || !xp) {
            message.channel.send('Por favor, digite o usuário do jogador e a XP (format: perkname=xp).');
            return;
        }

        const rcon = new Rcon(getRconConfig());
        await rcon.connect();

        try {
            await rcon.send(`addxp "${player}" ${xp}`);
            message.channel.send(`Added ${xp} to ${player}.`);
        } catch (error) {
            console.error('Error executing Rcon command:', error);
            message.channel.send('Error executing the command.');
        } finally {
            await rcon.end();
        }
    },
};

export default addxp;
