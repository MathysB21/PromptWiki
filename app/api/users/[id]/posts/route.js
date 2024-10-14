import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// These params get populated when you pass dynamic args in the path
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({ creator: params.id }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to retrieve prompts created by user", { status: 500})
    }
}