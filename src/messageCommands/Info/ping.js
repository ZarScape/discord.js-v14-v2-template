const {
    PermissionsBitField,
    MessageFlags,
    TextDisplayBuilder,
    ContainerBuilder,
    SeparatorBuilder,
} = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
    name: 'ping',
    aliases: ['p'],
    description: 'Check the app latency and status!',
    usage: 'ping',
    async run(client, message) {
        if (!message.guild) {
            return message.reply('This command can only be used in a server.');
        }

        const requiredAppPermissions = [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.EmbedLinks,
            PermissionsBitField.Flags.ReadMessageHistory,
        ];

        const appPerms = message.channel.permissionsFor(message.guild.members.me);
        const missingPerms = requiredAppPermissions.filter((perm) => !appPerms || !appPerms.has(perm));
        const accentColor = parseInt(String(config.color || '000000').replace('#', ''), 16);

        if (missingPerms.length > 0) {
            const permNames = missingPerms
                .map((perm) => Object.keys(PermissionsBitField.Flags).find((key) => PermissionsBitField.Flags[key] === perm))
                .join(', ');

            const errorText = new TextDisplayBuilder()
                .setContent(`⚠ **Missing Permissions**\nI need the following permissions to run this command: **${permNames}**`);

            const sep = new SeparatorBuilder();
            const container = new ContainerBuilder()
                .setAccentColor(accentColor)
                .addSeparatorComponents(sep)
                .addTextDisplayComponents(errorText)
                .addSeparatorComponents(sep);

            try {
                return await message.reply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [container],
                });
            } catch {
                return message.reply(`Missing permissions: ${permNames}`);
            }
        }

        const sent = Date.now();
        const pingText = new TextDisplayBuilder().setContent(
            `# 🏓 **Pong!**\n` +
            `**WebSocket Ping:** ${client.ws.ping}ms\n` +
            `**API Response Time:** ${Date.now() - sent}ms`
        );

        const separator = new SeparatorBuilder();
        const container = new ContainerBuilder()
            .setAccentColor(accentColor)
            .addSeparatorComponents(separator)
            .addTextDisplayComponents(pingText)
            .addSeparatorComponents(separator);

        try {
            await message.reply({
                flags: MessageFlags.IsComponentsV2,
                components: [container],
            });
        } catch {
            await message.reply(
                `Pong!\nWebSocket Ping: ${client.ws.ping}ms\nAPI Response Time: ${Date.now() - sent}ms`
            );
        }
    },
};
