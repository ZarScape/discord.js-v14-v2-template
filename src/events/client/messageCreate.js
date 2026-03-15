const config = require('../../config/config.json');
const {
    MessageFlags,
    TextDisplayBuilder,
    ContainerBuilder,
    SeparatorBuilder,
} = require('discord.js');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message) {
        if (!message || !message.content) return;
        if (message.author?.bot) return;

        const prefix = typeof config.prefix === 'string' ? config.prefix.trim() : '';
        const botName = typeof config.botName === 'string' && config.botName.trim().length > 0
            ? config.botName.trim().toLowerCase()
            : '';
        const mentionRegex = client.user
            ? new RegExp(`^<@!?${escapeRegex(client.user.id)}>(?:\\s+|$)`)
            : null;

        let content = message.content.trim();
        let triggerMatched = false;

        // 1) Prefix trigger, e.g. ?ping
        if (prefix && content.startsWith(prefix)) {
            triggerMatched = true;
            content = content.slice(prefix.length).trim();
        }

        // 2) Bot name trigger, e.g. zar ping
        if (!triggerMatched && botName) {
            const botNameRegex = new RegExp(`^${escapeRegex(botName)}(?:\\s+|$)`, 'i');
            const nameMatch = content.match(botNameRegex);
            if (nameMatch) {
                triggerMatched = true;
                content = content.slice(nameMatch[0].length).trim();
            }
        }

        // 3) Mention trigger, e.g. @zar ping
        if (!triggerMatched && mentionRegex) {
            const mentionMatch = content.match(mentionRegex);
            if (mentionMatch) {
                triggerMatched = true;
                content = content.slice(mentionMatch[0].length).trim();
            }
        }

        if (!triggerMatched) return;

        const args = content.split(/\s+/).filter(Boolean);
        if (args.length === 0) return;

        const input = args.shift().toLowerCase();
        const resolvedName = client.commands.has(input) ? input : client.aliases.get(input);
        if (!resolvedName) return;

        const command = client.commands.get(resolvedName);
        if (!command || typeof command.run !== 'function') return;

        try {
            await command.run(client, message, args, prefix);
        } catch (error) {
            console.error(`[MESSAGE COMMAND ERROR] ${resolvedName}:`, error);
            const errorText = new TextDisplayBuilder()
                .setContent('⚠ **Command Error**\nAn unexpected error occurred while running that command.');

            const sep = new SeparatorBuilder();
            const container = new ContainerBuilder()
                .setAccentColor(parseInt(String(config.color || '000000').replace('#', ''), 16))
                .addSeparatorComponents(sep)
                .addTextDisplayComponents(errorText)
                .addSeparatorComponents(sep);

            await message.reply({
                flags: MessageFlags.IsComponentsV2,
                components: [container],
            }).catch(() => null);
        }
    },
};
