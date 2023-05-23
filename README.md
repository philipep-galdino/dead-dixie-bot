# Dead Dixie Roleplay Server Management Bot

![Bot Logo](https://media.discordapp.net/attachments/1081222195763748885/1099838279337136259/image.png?width=1203&height=662)

Welcome to the Dead Dixie Roleplay Server Management Bot! This Discord bot is specifically designed to assist with managing and enhancing the experience on our Project Zomboid Roleplay Server, Dead Dixie Roleplay.

## Features

- **Player Management**: The bot provides commands to manage player registrations, character information, and server-related data.
- **Server Status**: Keep track of the server's status, player count, and uptime.
- **Announcements**: Easily broadcast important announcements or updates to all server members.
- **Event Management**: Organize and schedule in-game events for the community.
- **Administrative Tools**: The bot offers various administrative tools to help moderators and administrators efficiently manage the server.

## Commands

The bot supports most of the commands available through RCON on a Project Zomboid Dedicated Server. It provides an easy-to-use interface for managing your server using RCON commands. This bot acts as a RCON service-based bot, allowing you to control and monitor your Project Zomboid server seamlessly.

The following are some of the available commands:

- `!players`: List all currently connected players.
- `!kick [player] [reason]`: Kick a player from the server.
- `!ban [player] [reason]`: Ban a player from the server.
- `!teleport [player] [x] [y] [z]`: Teleport a player to specific coordinates.
- `!addItem [player] [item] [amount]`: Give items to a player.
- `!setaccesslevel [player] [access level]`: Set a player to any access level on the server.


Please refer to the official Project Zomboid documentation for a complete list of available RCON commands.

## Installation and Setup

1. Clone this repository: `git clone https://github.com/philipep-galdino/dead-dixie-bot.git`.
2. Install the necessary dependencies using `npm install`.
3. Configure the bot token and other settings in `config.js`.
4. Run the bot using `node bot.js`.

Make sure to obtain a Discord Bot Token from the Discord Developer Portal and invite the bot to your server before running the bot.

## Feedback and Bug Reporting

We welcome any feedback, suggestions, or bug reports! Please create an issue in this repository or contact our support team on our website.

## Additional Resources

For more information about Dead Dixie Roleplay, please visit our website: [deaddixierp.com.br](https://deaddixierp.com.br/).

## License

This project is licensed under the [MIT License](LICENSE).

