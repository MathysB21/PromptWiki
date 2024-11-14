import { connectToDB } from "@utils/database";
import User from "@models/user";

// These params get populated when you pass dynamic args in the path
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        // Get all the favourites (promptIds) from the user's data
        const user = await User.findById(params.id).populate({
            path: 'favourites',
            populate: {
                path: 'creator', // Populate the creator field within each favourite prompt
                model: 'User',   // Specify the model to populate (optional if schema is clear)
            }
        });

        if (!user) {
            return new Response("User not found", { status: 404 })
        }

        // Return a different response when there aren't any favourites
        if (!user.favourites) {
            return new Response("No favourites found for this user", { status: 204 })
        }

        return new Response(JSON.stringify(user.favourites), { status: 200 })
    } catch (error) {
        return new Response(`Failed to retrieve user favourites: ${error}`, { status: 500})
    }
}