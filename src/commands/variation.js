const { ApplicationCommandOptionType } = require("discord.js");
const imageCreateEmbed = require("../embeds/imageCreate.js");
const mergedBuffer = require("../../utils/imageMerger.js");
const imageVariation = require("../../api/createVariation.js");
const usageEmbed = require("../embeds/errorUsage.js");
const whitelist = require("../../whitelist.json").allowedUsers;
const appLog = require("../../utils/logger")

module.exports = {
    name: 'variation',
    description: 'Creates a variation of a given image.',
    aliases: ['v'],
    options: [
        {
            name: 'image',
            description: 'The image to use as the basis for the variation(s).',
            type: ApplicationCommandOptionType.Attachment,
            required: true,
        },
        {
            name: 'n',
            description: 'The number of images to generate.',
            type: ApplicationCommandOptionType.Integer,
            required: true,
            choices: [
                {
                    name: '1',
                    value: 1
                },
                {
                    name: '2',
                    value: 2
                },
                {
                    name: '4',
                    value: 4
                },
                {
                    name: '6',
                    value: 6
                },
                {
                    name: '9',
                    value: 9
                }
            ]
        },
        {
            name: 'size',
            description: 'The size of the image, defaults to 512x512 pixels.',
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: '256x256',
                    value: '256x256'
                },
                {
                    name: '512x512',
                    value: '512x512'
                },
                {
                    name: '1024x1024',
                    value: '1024x1024'
                }
            ]
        }
    ],

    run: async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const userWL = whitelist.find((user) => user.userID == interaction.user.id);
        if (!userWL) return interaction.reply('You are not whitelisted to use this command');

        let numImages = interaction.options.get('n').value;
        if (numImages > 1 && !userWL.premium) return interaction.reply('Only premium users can generate more than one image!');
        
        if (interaction.commandName === 'variation') {
            await interaction.deferReply();

            let image = interaction.options.getAttachment('image');
            const imageSize = interaction.options.get('size')?.value || '512x512';
            
            try {
                const response = await imageVariation(image.proxyURL, interaction.user.id, numImages, imageSize);
                const imageUrls = response.data.data.map(image => image.url);

                const imageBuffer = await mergedBuffer(imageUrls, numImages, parseInt(imageSize));

                embed = imageCreateEmbed(interaction, imageUrls);
                embed.setThumbnail(image.proxyURL);
                await interaction.editReply({
                    embeds: [embed],
                    files: [{
                        name: 'allVariations.jpeg',
                        attachment: imageBuffer
                    }]
                });
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    console.log(err.message);
                    interaction.editReply({
                        embeds: [usageEmbed]
                    });
                } else {
                    console.log(err.message);
                    interaction.editReply('There was an error while executing this command!');
                }
            }

            appLog(interaction.user.id, interaction.commandName, image.proxyURL);
        }
    }
}