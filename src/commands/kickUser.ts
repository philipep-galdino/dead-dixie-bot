// commands/kickuser.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const kickuser: Command = {
    name: 'kickuser',
    description: 'Kicka um usuário, basicamente. Adicione -r "motivo" para especificar o motivo do kick Utilize: /kickuser "username" -r "reason"',
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
        const reasonFlagIndex = args.indexOf('-r');
        const reason = reasonFlagIndex !== -1 ? args.slice(reasonFlagIndex + 1).join(' ') : 'Nenhum motivo foi especificado.';

        if (!player) {
            message.channel.send('Por favor, digite o nome de um usuário.');
            return;
        }

        const rcon = new Rcon(getRconConfig());
        await rcon.connect();

        try {
            await rcon.send(`/kickuser "${player}" -r "${reason}"`);
            message.channel.send(`Kicked ${player} for: ${reason}`);
        } catch (error) {
            console.error('Error executing Rcon command:', error);
            message.channel.send('Error executing the command.');
        } finally {
            await rcon.end();
        }
    },
};

export default kickuser;
