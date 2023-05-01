import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';


const banUnban: Command = {
    name: 'banunban',
    description: 'Bane ou desbane um usuário.',
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

    const action = args[0];
    const player = args[1];
    const reason = args.slice(2).join(' ') || 'Nenhum motivo foi especificado.';

    if (!action || !player) {
        message.channel.send('Por favor, especifique sua ação. Ban ou Unban?.');
        return;
    }

    const rcon = new Rcon(getRconConfig());
    await rcon.connect();

    try {
        if (action === 'ban') {
        await rcon.send(`/banuser "${player}" -r "${reason}"`);
        message.channel.send(`Banned ${player} for: ${reason}`);
        } else if (action === 'unban') {
        await rcon.send(`/unbanuser "${player}"`);
        message.channel.send(`Unbanned ${player}.`);
        } else {
        message.channel.send('Ação inválida. Utilize "ban" ou "unban".');
        }
    } catch (error) {
        console.error('Error executing Rcon command:', error);
        message.channel.send('Error executing the command.');
    } finally {
        await rcon.end();
    }
    },
};
  
export default banUnban;