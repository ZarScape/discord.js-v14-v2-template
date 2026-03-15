const fs = require('fs');
const path = require('path');
const colors = require('colors');

module.exports = (client) => {
    const commandsPath = path.join(__dirname, '../messageCommands');
    const loadedCommands = [];
    const skippedCommands = [];

    client.commands.clear();
    client.aliases.clear();

    if (!fs.existsSync(commandsPath)) {
        console.log(colors.yellow('[WARN] messageCommands folder not found, skipping message handler.'));
        return;
    }

    const registerCommand = (filePath, category) => {
        const fileName = path.basename(filePath);

        try {
            const command = require(filePath);
            if (!command || typeof command !== 'object') {
                skippedCommands.push(`${category}/${fileName} (invalid export)`);
                return;
            }

            if (!command.name || typeof command.run !== 'function') {
                skippedCommands.push(`${category}/${fileName} (missing name/run)`);
                return;
            }

            const commandName = command.name.toLowerCase();
            client.commands.set(commandName, command);

            if (Array.isArray(command.aliases)) {
                for (const alias of command.aliases) {
                    if (!alias || typeof alias !== 'string') continue;
                    client.aliases.set(alias.toLowerCase(), commandName);
                }
            }

            loadedCommands.push(`${category}/${commandName}`);
        } catch (error) {
            skippedCommands.push(`${category}/${fileName} (${error.message})`);
        }
    };

    const entries = fs.readdirSync(commandsPath, { withFileTypes: true });
    for (const entry of entries) {
        const entryPath = path.join(commandsPath, entry.name);

        if (entry.isDirectory()) {
            const files = fs.readdirSync(entryPath).filter(file => file.endsWith('.js'));
            for (const file of files) {
                registerCommand(path.join(entryPath, file), entry.name);
            }
            continue;
        }

        if (entry.isFile() && entry.name.endsWith('.js')) {
            registerCommand(entryPath, 'root');
        }
    }

    const allCommands = [
        'LOADED COMMANDS:',
        ...loadedCommands.map(name => `  • ${name}`),
        skippedCommands.length > 0 ? '\nSKIPPED COMMANDS:' : '',
        ...skippedCommands.map(file => `  • ${file}`),
    ].join('\n');

    const boxLength = Math.max(...allCommands.split('\n').map(line => line.length)) + 4;
    const top = `╔${'═'.repeat(boxLength)}╗`;
    const bottom = `╚${'═'.repeat(boxLength)}╝`;
    console.log(colors.green(top));
    allCommands.split('\n').forEach(line => {
        console.log(colors.green(`║ ${line.padEnd(boxLength - 2)} ║`));
    });
    console.log(colors.green(bottom));

    console.log(colors.magenta('SUCCESS: Message commands loaded successfully!'));
};
