// /separator: Demonstrates usage of Discord v2 components
// This command shows how to add text labels and visual separators/dividers
// between them in a single container using supported spacing sizes.

const { 
  SlashCommandBuilder, 
  MessageFlags, 
  SeparatorBuilder,
  ContainerBuilder, 
  TextDisplayBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command metadata
  data: new SlashCommandBuilder()
    .setName('separator')
    .setDescription('Shows supported V2 component separators.'),

  // Run function executed when the slash command is triggered
  run: async (client, interaction) => {

    // ------------------------ SMALL DIVIDER ------------------------
    // Text label for small divider
    const textSmall = new TextDisplayBuilder()
      .setContent('🔹 Small Divider'); // Example usage of TextDisplayBuilder

    // Separator with visible line and small spacing
    const smallDivider = new SeparatorBuilder()
      .setDivider(true)  // Show the line
      .setSpacing(1);    // Small spacing (supported)

    // ------------------------ LARGE DIVIDER ------------------------
    // Text label for large divider
    const textLarge = new TextDisplayBuilder()
      .setContent('🔸 Large Divider');

    // Separator with visible line and large spacing
    const largeDivider = new SeparatorBuilder()
      .setDivider(true)  // Show the line
      .setSpacing(2);    // Large spacing (supported)

    // ------------------------ INVISIBLE SPACER ------------------------
    // Text label for invisible spacer
    const textInvisible = new TextDisplayBuilder()
      .setContent('⚪ Invisible Spacer');

    // Separator with no line, used as a spacer
    const invisibleSpacer = new SeparatorBuilder()
      .setDivider(false) // Invisible (no line)
      .setSpacing(1);    // Must use Small spacing (1)

    // ------------------------ CONTAINER ------------------------
    // ContainerBuilder wraps all text labels and separators together
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)      // Optional accent color for the container

      // Add small divider section
      .addTextDisplayComponents(textSmall)
      .addSeparatorComponents(smallDivider)

      // Add large divider section
      .addTextDisplayComponents(textLarge)
      .addSeparatorComponents(largeDivider)

      // Add invisible spacer section
      .addTextDisplayComponents(textInvisible)
      .addSeparatorComponents(invisibleSpacer);

    // ------------------------ SEND TO USER ------------------------
    // Reply to the interaction with the container
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Required to render v2 components
      components: [container],
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /separator
    // 2. TextDisplayBuilder:
    //    - Holds static text.
    //    - Supports Markdown (bold, italic, code blocks, emojis).
    //    - Can be combined with other components inside a ContainerBuilder.
    // 3. SeparatorBuilder:
    //    - Adds a visible line divider between components.
    //    - setDivider(true): shows the line.
    //    - setDivider(false): invisible spacing (optional).
    //    - setSpacing(number): controls vertical spacing; supported values in this version: 1 (Small), 2 (Large).
    // 4. ContainerBuilder:
    //    - Wraps TextDisplay and Separator components for v2.
    //    - You can add multiple TextDisplay, Separator, Button, Section, or MediaGallery components.
    // 5. Flags: MessageFlags.IsComponentsV2 required for v2 components.
    // 6. Usage:
    //    - User runs /separator → sees labeled Small, Large dividers, and an invisible spacer.
    // 7. Customization:
    //    - Change text content, add emojis, code blocks, or combine multiple TextDisplay blocks.
    //    - Add more separators, buttons, or sections as needed.
  },
};
