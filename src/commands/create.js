const { ApplicationCommandOptionType } = require("discord.js");
const imageCreate = require("../../api/createImage.js");
const imageCreateEmbed = require("../embeds/imageCreate.js");
const mergedBuffer = require("../../utils/imageMerger.js");
const usageEmbed = require("../embeds/errorUsage.js");
const whitelist = require("../../whitelist.json").allowedUsers;
const appLog = require("../../utils/logger")

module.exports = {
    name: 'create',
    description: 'Creates an image from a prompt.',
    aliases: ['c'],
    options: [
        {
            name: 'image-description',
            description: 'Enter a detailed description',
            type: ApplicationCommandOptionType.String,
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

        if (interaction.commandName === 'create') {
            let prompt = interaction.options.get('image-description').value;
            await interaction.deferReply();

            const imageSize = interaction.options.get('size')?.value || '512x512';

            try {
                const response = await imageCreate(prompt, interaction.user.id, numImages, imageSize);
                const imageUrls = response.data.data.map(image => image.url);

                const imageBuffer = await mergedBuffer(imageUrls, numImages, parseInt(imageSize));

                await interaction.editReply({
                    embeds: [imageCreateEmbed(interaction, imageUrls, prompt)],
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

            appLog(interaction.user.id, interaction.commandName, prompt);
        }
    }
}