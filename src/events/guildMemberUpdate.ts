import { Client, GuildMember, MessageEmbed, TextChannel } from 'discord.js';

import { Event } from '../types';

import { addWhitelistUser, removeWhitelistUser } from '../utils/rcon';
import { cleanNickname } from '../utils/cleanUserNickname';

const guildMemberUpdate: Event = {
  name: 'guildMemberUpdate',
  execute: async (client: Client, oldMember: GuildMember, newMember: GuildMember) => {
    const specificRoleId = '1085947976075194400';
    const channelId = '1095099899235803324';
    const oldRoles = oldMember.roles.cache;
    const newRoles = newMember.roles.cache;

    const channel = client.channels.cache.get(channelId);

    if (!channel || !(channel instanceof TextChannel)) {
      console.error('Channel not found or is not a TextChannel');
      return;
    }

    const userNickname = newMember.nickname || newMember.user.username;
    const cleanedUserNickname = cleanNickname(userNickname);

    if (!oldRoles.has(specificRoleId) && newRoles.has(specificRoleId)) {
        try {
          await newMember.setNickname(cleanedUserNickname);
        } catch (error) {
          console.error(`Error setting nickname for user ${cleanedUserNickname}(${newMember.user.tag}):`, error);
        }

        console.log(`Role added to user: ${cleanedUserNickname}(${newMember.user.tag})`);

        try {
          const generatedPassword = await addWhitelistUser(cleanedUserNickname, channel);

          channel.send(`User ${cleanedUserNickname}(${newMember.user.tag}) added to the whitelist.`);

  
          const embed = new MessageEmbed()
          .setTitle('Informações da Whitelist')
          .setDescription(
            `Você foi adicionado à whitelist do Dead Dixie! Estamos no Ato 1. Segue suas credenciais:`
          )
          .addFields(
            { name: 'User', value: cleanedUserNickname },
            { name: 'Password', value: generatedPassword }
          )
          .setFooter({ text: 'Mantenha essa informação segura e não compartilhe com NINGUÉM.' });
        
          await newMember.user.send({ embeds: [embed] });
        } catch (error) {
          console.error(error);
          channel.send(`Error adding user ${cleanedUserNickname}(${newMember.user.tag}) to the whitelist.`);
        }
    } else if (oldRoles.has(specificRoleId) && !newRoles.has(specificRoleId)) {
        console.log(`Role removed from user: ${newMember.user.tag}`);
  
        try {
          await removeWhitelistUser(userNickname);
          channel.send(`User ${userNickname} removed from the whitelist.`);
  
          const embed = new MessageEmbed()
            .setTitle('Informações da Whitelist')
            .setDescription(
                `Você foi removido da whitelist. Se você tiver alguma dúvida ou preocupação, entre em contato com o membro da equipe que o removeu para obter mais informações.`
            )
            .addFields(
                { name: 'Usuário', value: userNickname }
            )
            .setFooter({ text: 'Esperamos vê-lo novamente no servidor.' });
        
            
          await newMember.user.send({ embeds: [embed] });
            
        } catch (error) {
          console.error(error);
          channel.send(`Error removing user ${userNickname} from the whitelist.`);
        }
      }
    },
  };
  
  export default guildMemberUpdate;
