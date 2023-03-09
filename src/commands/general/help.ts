import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('help')
    .setDescription('get a list of all commands')

export default command(meta, ({ interaction }) => {
    return interaction.reply({
        ephemeral: true,
        content: 'IMPLEMENTATION NEEDED'
    })
})