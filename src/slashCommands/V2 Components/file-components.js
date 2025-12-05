// /file-component: Demonstrates File component usage with a dynamically generated JSON
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  TextDisplayBuilder, 
  FileBuilder, 
  ContainerBuilder, 
  AttachmentBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('file-component')
    .setDescription('Demonstrates attaching a file dynamically using Components V2'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    // ---------------- Create Dummy JSON ----------------
    // Create a simple JSON object and convert it to a buffer
    const dummyJSON = { message: 'Hello from Components V2! join my support server if this code helps https://discord.gg/6YVmxA4Qsf', timestamp: new Date() };
    const buffer = Buffer.from(JSON.stringify(dummyJSON, null, 2));

    // ---------------- Attachment ----------------
    // AttachmentBuilder holds the actual file to send to Discord
    const attachment = new AttachmentBuilder(buffer, { name: 'dummy.json' });

    // ---------------- File Component ----------------
    // FileBuilder references the attachment inside the container
    const fileComponent = new FileBuilder().setURL('attachment://dummy.json');

    // ---------------- Text Display ----------------
    // TextDisplayBuilder shows a description or guide next to the file
    const text = new TextDisplayBuilder()
      .setContent('📄 **File Component Example**\nThis JSON file is attached dynamically.');

    // ---------------- Container ----------------
    // ContainerBuilder groups multiple components together
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)        // Optional color for the container
      .addTextDisplayComponents(text)   // Add descriptive text
      .addFileComponents(fileComponent); // Add the file component

    // ---------------- Interaction Reply ----------------
    // Reply with the container and the attachment
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Required for v2 components
      components: [container],            // Include the container
      files: [attachment],                // Include the actual file
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /file-component
    // 2. Buffer: JSON data is created in-memory, no file system needed.
    // 3. AttachmentBuilder: Holds the file to send to Discord.
    // 4. FileBuilder: Displays a reference to the attachment inside a V2 container.
    // 5. TextDisplayBuilder: Adds explanatory text above or alongside the file.
    // 6. ContainerBuilder: Wraps the TextDisplay and File components together.
    // 7. MessageFlags.IsComponentsV2: Required for all v2 component messages.
    // 8. Usage: User runs /file-component → sees descriptive text and can download the file.
    // 9. Customization: You can attach multiple files or other components (Sections, MediaGallery, Buttons) in the same container.
  },
};
