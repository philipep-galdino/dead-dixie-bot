// commands/servermsg.ts
import { Command } from '../types';
import { Message } from 'discord.js';
import { Rcon } from 'rcon-client';
import { getRconConfig } from '../utils/rcon';

const servermsg: Command = {
    name: 'servermsg',
    description: 'Manda uma mensagem para todos os usuários em nome do servidor. Utilize: /servermsg "text"',
    execute: async (
        message: Message, args: string[]) => {
            const requiredRoleID = '1085755248557162578';

            if (!message.member) {
                message.channel.send('Este comando só pode ser utilizado dentro do Servidor do Discord.');
                return;
            }
    
            if (!message.member.roles.cache.has(requiredRoleID)) {
                message.channel.send(`Você precisa ser um Game Master ou + para utilizar esse comando, trouxa.`);
                return;
            }
            
            const text = args.join(' ');
    
            if (!text) {
                message.channel.send('Por favor, digite pelo menos alguma mensagem.');
                return;
            }
    
            const rcon = new Rcon(getRconConfig());
            await rcon.connect();
    
            try {
                await rcon.send(`/servermsg "${text}"`);
                message.channel.send(`Broadcasted message: ${text}`);
            } catch (error) {
                console.error('Error executing Rcon command:', error);
                message.channel.send('Error executing the command.');
            } finally {
                await rcon.end();
            }
        },
    };
    
    export default servermsg;
    