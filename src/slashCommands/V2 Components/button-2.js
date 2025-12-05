// src/slashCommands/V2 Components/button-2.js
const {
  SlashCommandBuilder,
  MessageFlags,
  TextDisplayBuilder,
  ContainerBuilder,
  ButtonBuilder,
  ButtonStyle,
  SeparatorBuilder,
  SeparatorSpacingSize,
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('button-2')
    .setDescription('Shows a link button inside a container (style 2'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    try {
      // ---------------- Main Content ----------------
      // Text block to display above the button
      const text = new TextDisplayBuilder().setContent('Click the button below to visit my site:');

      // Link button that opens your GitHub Pages site
      const linkButton = new ButtonBuilder()
        .setLabel('Visit ZarScape Site')        // Button label text
        .setStyle(ButtonStyle.Link)             // Link button style
        .setURL('https://zarScape.github.io');  // URL to open when clicked

      // Optional separator between text and button
      const sep = new SeparatorBuilder()
        .setDivider(true)
        .setSpacing(SeparatorSpacingSize.Small);

      // ContainerBuilder combines text, separator, and button for v2 components
      const container = new ContainerBuilder()
        .setAccentColor(0x5865F2)                     // Optional container color
        .addTextDisplayComponents(text)               // Add the text block
        .addSeparatorComponents(sep)                  // Add the separator
        .addActionRowComponents(actionRow =>          // Add the button inside an action row
          actionRow.setComponents(linkButton)
        );

      // Reply to the interaction with v2 components and ephemeral flag
      await interaction.reply({
        flags: MessageFlags.IsComponentsV2, // Required flags
        components: [container],                                     // Send the container
      });

      // ---------------- GUIDE ----------------
      // 1. Slash Command: /button-2
      // 2. TextDisplayBuilder: Displays the message above the button.
      // 3. SeparatorBuilder: Adds spacing or a divider between text and button.
      // 4. ButtonBuilder: Link button opens external URL; no customId needed.
      // 5. ContainerBuilder: Holds text, separator, and action row (required for v2 components).
      // 6. addActionRowComponents: Wraps the button correctly in an ActionRowBuilder.
      // 7. MessageFlags: Combine IsComponentsV2 with Ephemeral for ephemeral v2 reply.
      // 8. Usage: User runs /button-2 → sees the text + clickable link button.
      // 9. Customization: Change .setLabel(), .setURL(), or text content to your own site/message.

    } catch (err) {
      console.error('[BUTTON2 COMMAND ERROR]', err);

      // ---------------- Error Handling ----------------
      // Fallback error message using v2 container
      if (interaction?.isRepliable && interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
        const errorBlock = new ContainerBuilder()
          .addTextDisplayComponents(
            new TextDisplayBuilder().setContent('⚠️ An error occurred while sending the button.')
          );

        await interaction.reply({
          flags: MessageFlags.IsComponentsV2 | MessageFlags.Ephemeral,
          components: [errorBlock],
        }).catch(() => {});
      }
    }
  },
};
