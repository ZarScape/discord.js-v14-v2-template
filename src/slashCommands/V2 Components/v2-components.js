// /v2-components: Demonstrates all Discord Components V2
// Detailed guide included at the bottom

const {
  MessageFlags,
  TextDisplayBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ThumbnailBuilder,
  SectionBuilder,
  ChannelSelectMenuBuilder,
  ActionRowBuilder,
  ContainerBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  ButtonBuilder,
  ButtonStyle,
  FileBuilder,
  AttachmentBuilder,
  SlashCommandBuilder
} = require('discord.js');
const config = require('../../config/config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('v2-components')
    .setDescription('Sends a message demonstrating all Components V2'),

  /**
   * @param {import('discord.js').CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    const botAvatarURL = client.user.displayAvatarURL({ extension: 'png', size: 512 });

    // TextDisplay
    const textDisplay = new TextDisplayBuilder()
      .setContent('🔹 This is a TextDisplay component.');

    // Separator
    const separator = new SeparatorBuilder()
      .setDivider(true)
      .setSpacing(SeparatorSpacingSize.Small);

    // Section with Thumbnail
    const thumbnail = new ThumbnailBuilder({ media: { url: botAvatarURL } });
    const sectionWithThumbnail = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('📄 **Section Title**'),
        new TextDisplayBuilder().setContent('This is a description inside a Section component, with a thumbnail.')
      )
      .setThumbnailAccessory(thumbnail);

    // Channel Select Menu
    const channelSelectMenu = new ChannelSelectMenuBuilder()
      .setCustomId('channel_select_menu')
      .setPlaceholder('Select a channel…');
    const selectActionRow = new ActionRowBuilder().addComponents(channelSelectMenu);

    // Media Gallery
    const mediaGallery = new MediaGalleryBuilder().addItems(
      new MediaGalleryItemBuilder().setURL('https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background.png'),
      new MediaGalleryItemBuilder().setURL('https://raw.githubusercontent.com/ZarScape/ZarScape/refs/heads/main/images/ZarScape/logo-with-background.png')
    );

    // Sections with Buttons
    const sectionWithButtons = [
      new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent('🌐 GitHub'))
        .setButtonAccessory(
          new ButtonBuilder()
            .setLabel('GitHub')
            .setURL('https://github.com/ZarScape')
            .setStyle(ButtonStyle.Link)
        ),
      new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent('📺 **YouTube**'))
        .setButtonAccessory(
          new ButtonBuilder()
            .setLabel('Channel')
            .setURL('https://www.youtube.com/@ZarScape')
            .setStyle(ButtonStyle.Link)
        ),
      new SectionBuilder()
        .addTextDisplayComponents(new TextDisplayBuilder().setContent('💬 **Discord**'))
        .setButtonAccessory(
          new ButtonBuilder()
            .setLabel('Zar HQ')
            .setURL('https://discord.gg/6YVmxA4Qsf')
            .setStyle(ButtonStyle.Link)
        )
    ];

    // Generate dummy JSON in memory
    const dummyJSON = Buffer.from(JSON.stringify({ message: 'This is a dummy JSON file', timestamp: Date.now() }, null, 2));
    const attachment = new AttachmentBuilder(dummyJSON, { name: 'dummy.json' });
    const fileComponent = new FileBuilder().setURL('attachment://dummy.json');

    // Container
    const container = new ContainerBuilder()
      .setAccentColor(parseInt(config.color.replace('#', ''), 16))
      .addMediaGalleryComponents(mediaGallery)
      .addSectionComponents(sectionWithThumbnail)
      .addMediaGalleryComponents(
        new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(botAvatarURL))
      )
      .addSectionComponents(...sectionWithButtons)
      .addSeparatorComponents(new SeparatorBuilder().setDivider(true).setSpacing(SeparatorSpacingSize.Small))
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent('📝 **This message is fully composed of Components V2.**'),
        new TextDisplayBuilder().setContent('- Use TextDisplay for static text.'),
        new TextDisplayBuilder().setContent('- Use Section for grouping text with accessories.'),
        new TextDisplayBuilder().setContent('- Use MediaGallery for images/carousels.'),
        new TextDisplayBuilder().setContent('- Use Separator for dividing blocks of content.'),
        new TextDisplayBuilder().setContent('- Use File to attach JSON, images, or other files.'),
        new TextDisplayBuilder().setContent('- Use Button as interactive links or actions.'),
        new TextDisplayBuilder().setContent('- Use ChannelSelectMenu to let users pick a channel.')
      )
      .addFileComponents(fileComponent);

    // Reply
    await interaction.reply({
      flags: MessageFlags.IsComponentsV2,
      components: [textDisplay, separator, sectionWithThumbnail, selectActionRow, container],
      files: [attachment]
    });
  }
};

/**
 * ===========================
 * 📖 GUIDE: Discord Components V2
 * ===========================
 * 
 * 🔹 TextDisplay
 *   - Displays static text.
 *   - Supports Markdown formatting (bold, italics, emoji, etc).
 * 
 * 🔹 Separator
 *   - Adds spacing or dividers between blocks.
 *   - Options: Small, Medium, Large spacing.
 *   - Can show divider line.
 * 
 * 🔹 Section
 *   - Groups multiple TextDisplays and optional accessories:
 *     - Thumbnail
 *     - Button
 *     - Select menus
 * 
 * 🔹 Thumbnail
 *   - Adds a small image to the left side of a Section.
 * 
 * 🔹 ChannelSelectMenu
 *   - Dropdown menu for choosing a channel from the guild.
 * 
 * 🔹 MediaGallery
 *   - Carousel-style image gallery.
 *   - Can contain multiple images, shown as slides.
 * 
 * 🔹 Button
 *   - Interactive element.
 *   - Styles: Primary, Secondary, Success, Danger, Link.
 *   - Can be used as links or actions.
 * 
 * 🔹 File
 *   - Attaches files (JSON, images, etc) for download.
 *   - Generated dynamically in memory here; no filesystem required.
 * 
 * 🔹 Container
 *   - Groups components into a single structured layout.
 *   - Supports accent colors, multiple component types.
 * 
 * ===========================
 * ✅ This command shows ALL of the above in one message.
 * ===========================
 */
