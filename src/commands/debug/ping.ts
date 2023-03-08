import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('ping the bot for a response.')
    .addStringOption((option) => 
        option
            .setName('message')
            .setDescription('Provide the bot message to respond with.')
            .setMinLength(1)
            .setMaxLength(2000)
            .setRequired(false)
    )

export default command(meta, ({ interaction }) => {
    const msg = interaction.options.getString('message')

    return interaction.reply({
        ephemeral: true,
        content: msg ?? 'Pong!🏓'
    })
})