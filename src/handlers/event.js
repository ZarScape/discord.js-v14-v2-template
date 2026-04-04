// ========================= EVENT HANDLER =========================
const fs = require('fs');
const { colorize } = require('../utils/consoleStyle');

module.exports = (client) => {
    client.setMaxListeners(100);

    let loadedEvents = [];
    let skippedEvents = [];

    fs.readdirSync('./src/events/').forEach(dir => {
        const files = fs.readdirSync(`./src/events/${dir}`).filter(f => f.endsWith('.js'));

        for (const file of files) {
            const event = require(`../events/${dir}/${file}`);
            if (!event.name) {
                skippedEvents.push(file);
                continue;
            }

            if (event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args));
            } else {
                client.on(event.name, (...args) => event.execute(client, ...args));
            }

            loadedEvents.push(`${event.name}${event.once ? ' (once)' : ''}`);
        }
    });

    // Build single box log
    const allEvents = [
        'LOADED EVENTS:',
        ...loadedEvents.map(name => `  • ${name}`),
        skippedEvents.length > 0 ? '\nSKIPPED EVENTS:' : '',
        ...skippedEvents.map(file => `  • ${file}`)
    ].join('\n');

    const boxLength = Math.max(...allEvents.split('\n').map(line => line.length)) + 4;
    const top = `╔${'─'.repeat(boxLength)}╗`;
    const bottom = `╚${'─'.repeat(boxLength)}╝`;
    console.log(colorize('cyan', top));
    allEvents.split('\n').forEach(line => {
        console.log(colorize('cyan', `║ ${line.padEnd(boxLength - 2)} ║`));
    });
    console.log(colorize('cyan', bottom));

    console.log(colorize('magenta', 'All events loaded successfully!'));
};
