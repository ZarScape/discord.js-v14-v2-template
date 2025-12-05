// /media-gallery: Demonstrates MediaGallery usage with specific images
const { 
  SlashCommandBuilder, 
  MessageFlags, 
  MediaGalleryBuilder, 
  MediaGalleryItemBuilder, 
  ContainerBuilder 
} = require('discord.js');

module.exports = {
  // Define the slash command
  data: new SlashCommandBuilder()
    .setName('media-gallery')
    .setDescription('Displays a carousel of images using MediaGallery.'),

  // Run function executed when the slash command is used
  run: async (client, interaction) => {
    // ---------------- MediaGallery ----------------
    // MediaGalleryBuilder displays images/videos in a carousel format
    const gallery = new MediaGalleryBuilder().addItems(
      new MediaGalleryItemBuilder()
        .setURL('https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background.png')
    );

    // ---------------- Container ----------------
    // ContainerBuilder holds the media gallery for v2 components
    const container = new ContainerBuilder()
      .setAccentColor(0x5865F2)          // Optional container color
      .addMediaGalleryComponents(gallery); // Add the MediaGallery

    // ---------------- Interaction Reply ----------------
    // Reply with the container containing the media gallery
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2, // Required flag for v2 components
      components: [container],            // Send the container with MediaGallery
    });

    // ---------------- GUIDE ----------------
    // 1. Slash Command: /media-gallery
    // 2. MediaGalleryBuilder: Creates a carousel of images/videos.
    // 3. MediaGalleryItemBuilder: Each image/video to display in the gallery.
    // 4. ContainerBuilder: Wraps the gallery in a v2 components container.
    // 5. Flags: MessageFlags.IsComponentsV2 is required for v2 components.
    // 6. Usage: User runs /media-gallery → sees a carousel of the defined images.
    // 7. Customization: Add more MediaGalleryItemBuilder objects to show more images/videos.
  },
};
