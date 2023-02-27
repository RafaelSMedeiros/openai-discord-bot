const { EmbedBuilder } = require("discord.js");

function imageCreateEmbed(interaction, imageUrls, prompt) {
    const fields = imageUrls.reduce((res, url, index) => {
        res.push({
            name:`Image Variation ${index + 1}`,
            value: `[Download](${url})`,
            inline: true
        });
        return res;
    }, []);

    const description = prompt || 'Attached image sent  ➚'
    return new EmbedBuilder()
        .setColor(0xA020F0)
        .setAuthor({ name: `${interaction.user.username}'s ${interaction.commandName} request` })
        .setTitle('Your prompt:')
        .setImage('attachment://allVariations.jpeg')
        .setDescription(description)
        .addFields(fields)
        .setTimestamp()
}

module.exports = imageCreateEmbed