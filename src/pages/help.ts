import { APIEmbedField, EmbedBuilder, InteractionReplyOptions, StringSelectMenuBuilder } from "discord.js"
import { chunk, createId, readId } from '../utils'
import CategoryRoot from '../commands'
import { ActionRowBuilder } from "@discordjs/builders"
import { off } from "process"

export const Namespaces = {
    root: 'help_category',
    select: 'help_category_seclect',
    action: 'help_category_action',
}


export const Actions = {
    next: '+',
    back: '-',
}

const N = Namespaces
const A = Actions

// Generate root embed for help pagination

export function getCategoryRoot(ephemeral?: boolean): InteractionReplyOptions {
    // Map the categories
    const mappedCategories = CategoryRoot.map(({ name, description, emoji }) => 
        new SelectMenuOptionBuilder({
            label: name,
            description,
            emoji,
            value: name,
        })
    )

    // Create embed
    const embed = new EmbedBuilder()
        .setTitle('Help Menu')
        .setDescription('Browse through all commands.')

    // Create select menu for categories
    const selectId = createId(N.select)
    const select = new StringSelectMenuBuilder()
        .setCustomId(selectId)
        .setPlaceholder('Command Category')
        .setMaxValues(1)
        .setOptions(mappedCategories)

    const component = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(select)

    return {
        embeds: [embed],
        components: [component],
        ephemeral,
    }
}

// Generate new embed for current category page
export function getCategoryPage(interactionId: string): InteractionReplyOptions {
    // extract needed meta data from interactionId
    const [_namespace , categoryName, action, currentOffset] = readId(interactionId)

    const categoryChunks = CategoryRoot.map((c) => {
        // Pre-map all the commands as embed fields
        const commands: APIEmbedField[] = c.commands.map((c) => ({
            name: c.meta.name,
            value: c.meta.description,
        }))

        return {
            ...c,
            commands: chunk(commands, 10),
        }
    })

    const category = categoryChunks.find(({ name }) => name === categoryName)
    if (!category)
        throw new Error('Invalid interactionId; Failed to find corresponding category page!')
    
    let offset = parseInt(currentOffset)
    if (isNaN(offset)) offset = 0
    if (action === A.next) ++offset
    else if (action === A.back) --offset
    
    const emoji = category.emoji ? `${category.emoji}` : ''
    const defaultDescription = `Browsr through ${category.commands.flat().length} commands in ${emoji}${category.name}`

    const embed = new EmbedBuilder()
        .setTitle(`${emoji}${category.name} Commands`)
        .setDescription(category.description ?)
}