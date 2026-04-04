# Changelog

All notable changes to this project are documented in this file.

## [1.1.1] - 2026-04-04

### Changed
- Updated `discord.js` to `^14.26.2`.
- Updated `dotenv` to `^17.4.0`.
- Removed the `colors` dependency and replaced it with a native console styling helper built on Node's `util.styleText`.
- Bumped package version metadata to `1.1.1`.

## [1.1.0] - 2026-03-07

### Added
- Added message command support with a dedicated loader in `src/handlers/message.js`.
- Added message command event flow in `src/events/client/messageCreate.js`.
- Added a message ping command at `src/messageCommands/Info/ping.js`.
- Added configurable message command triggers from `src/config/config.json`:
  - `prefix` (example: `?ping`)
  - `botName` (example: `zar ping`)
  - bot mention (example: `@Bot ping`)

### Changed
- Updated startup loading in `src/index.js` to include the `message` handler.
- Updated message handler logging to match slash handler console box style.
- Updated message command error responses to use Components V2 containers.
- Updated `README.md` to document message command support and usage.


### Message Commands (Added)

Message commands are now supported through:

- `src/handlers/message.js` (loader)
- `src/events/client/messageCreate.js` (runtime parser)
- `src/messageCommands/<Category>/*.js` (command files)

### Supported Triggers

The message command parser supports 3 trigger styles, in this order:

1. Prefix trigger from `src/config/config.json` (`prefix`)
2. Bot name trigger from `src/config/config.json` (`botName`)
3. Bot mention trigger (`@Bot`)

Example config:

```json
{
  "color": "000000",
  "prefix": "?",
  "botName": "zar"
}
```

Usage examples:

- `?ping`
- `zar ping`
- `@YourBot ping`

### Message Command File Format

Create message commands in:

- `src/messageCommands/Info/ping.js`
- `src/messageCommands/<Category>/<command>.js`

Export format:

```js
module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Check the app latency and status!',
  usage: 'ping',
  async run(client, message, args, prefix) {
    // command logic
  },
};
```

### V2 Components Response Style

Message command responses are designed to use Components V2 style, similar to slash commands:

- `ContainerBuilder`
- `TextDisplayBuilder`
- `SeparatorBuilder`
