import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Reponse("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to retrieve prompt.", { status: 500})
    }
}

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { prompt, tags } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) return new Response("Prompt not found", { status: 404})

        existingPrompt.prompt = prompt
        existingPrompt.tags = tags

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE (delete)
export const DELETE = async(request, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id)

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })
    }
}