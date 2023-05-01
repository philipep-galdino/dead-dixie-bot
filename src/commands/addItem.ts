// commands/additem.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const additem: Command = {
    name: 'additem',
    description: 'Spawne um item com algum jogador. A quantidade é opcional, utilize: /additem "username" "module.item" count, ex : additem Legal Base.Axe 1',
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
        const item = args[1];
        const count = args[2] || '1';

        if (!player || !item) {
            message.channel.send('Por favor, insira um jogador e um item! (format: module.item).');
            return;
        }

        const rcon = new Rcon(getRconConfig());
        await rcon.connect();

        try {
            await rcon.send(`/additem "${player}" "${item}" ${count}`);
            message.channel.send(`Setado ${count} ${item} to ${player}.`);
        } catch (error) {
            console.error('Error executing Rcon command:', error);
            message.channel.send('Error executing the command.');
        } finally {
            await rcon.end();
        }
    },
};

export default additem;
