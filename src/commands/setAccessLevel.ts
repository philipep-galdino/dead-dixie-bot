// commands/setaccesslevel.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const setaccesslevel: Command = {
    name: 'setaccesslevel',
    description: 'Seta o nível de acesso do usuário. Níveis atuais: admin, moderator, overseer, gm, observer. Utilize: setaccesslevel userName admin / PS: Para remover qualquer nível de acesso, utilize "none" no lugar de "admin"',
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
        const level = args[1];

        if (!player || !level) {
            message.channel.send('Por favor, digite o nome de um usuário e o nível de acesso.');
            return;
        }

        const rcon = new Rcon(getRconConfig());
        await rcon.connect();

        try {
            await rcon.send(`/setaccesslevel "${player}" ${level}`);
            message.channel.send(`Set access level of ${player} to ${level}.`);
        } catch (error) {
            console.error('Error executing Rcon command:', error);
            message.channel.send('Error executing the command.');
        } finally {
            await rcon.end();
        }
    },
};

export default setaccesslevel;
