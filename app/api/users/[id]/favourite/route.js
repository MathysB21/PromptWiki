import User from "@models/user";
import { connectToDB } from "@utils/database";

// PATCH (update)
export const PATCH = async (request, { params }) => {
    const { promptId } = await request.json();

    try {
        await connectToDB();

        // Get all the favourites (promptIds) from the user's data
        const existingUser = await User.findById(params.id).populate('favourites')

        if (!existingUser) {
            return new Response("User not found", { status: 404 })
        }

        // Check if the current promptId is in the favourites
        const isFavourite = existingUser.favourites.some((fav) => fav.equals(promptId));

        if (isFavourite) {
            // Remove the promptId if it's already in the favourites
            existingUser.favourites = existingUser.favourites.filter((fav) => !fav.equals(promptId));
        } else {
            // Add the promptId if it's not already in the favourites
            existingUser.favourites.push(promptId);
        }

        await existingUser.save();

        return new Response(JSON.stringify(existingUser.favourites), { status: 200 });
    } catch (error) {
        return new Response(`Failed to update user favourites: ${error}`, { status: 500 });
    }
};
