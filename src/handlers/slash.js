// ========================= SLASH COMMAND HANDLER =========================
const client = require('../index');
const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const colors = require('colors');
require('dotenv').config({ quiet: true });

module.exports = async () => {
    const slash = [];
    let loadedCommands = [];
    let skippedCommands = [];

    fs.readdirSync('./src/slashCommands/').forEach(dir => {
        const commands = fs.readdirSync(`./src/slashCommands/${dir}`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            const commandModule = require(`../slashCommands/${dir}/${file}`);

            if (commandModule.data && commandModule.data instanceof SlashCommandBuilder) {
                slash.push(commandModule.data.toJSON());
                client.slash.set(commandModule.data.name, commandModule);
                loadedCommands.push(commandModule.data.name);
            } else {
                skippedCommands.push(file);
            }
        }
    });

    // Build single box log
    const allCommands = [
        'LOADED COMMANDS:',
        ...loadedCommands.map(name => `  • ${name}`),
        skippedCommands.length > 0 ? '\nSKIPPED COMMANDS:' : '',
        ...skippedCommands.map(file => `  • ${file}`)
    ].join('\n');

    const boxLength = Math.max(...allCommands.split('\n').map(line => line.length)) + 4;
    const top = `╔${'─'.repeat(boxLength)}╗`;
    const bottom = `╚${'─'.repeat(boxLength)}╝`;
    console.log(colors.green(top));
    allCommands.split('\n').forEach(line => {
        console.log(colors.green(`║ ${line.padEnd(boxLength - 2)} ║`));
    });
    console.log(colors.green(bottom));

    // Check .env
    if (!process.env.TOKEN || !process.env.CLIENTID) {
        console.log(colors.red('ERROR: TOKEN or CLIENTID missing in .env'));
        return process.exit();
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENTID),
            { body: slash }
        );
        console.log(colors.magenta('SUCCESS: Slash commands registered successfully!'));
    } catch (err) {
        console.log(colors.red(`ERROR: Failed to register commands: ${err}`));
    }
};
