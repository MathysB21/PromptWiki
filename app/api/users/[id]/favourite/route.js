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

        // Return a different response when there aren't any favourites
        if (!existingUser.favourites) {
            return new Response("No favourites found for this user", { status: 204 })
        }

        // Check if the current promptId is in the favourites
        if (existingUser.favourites.includes(promptId)) {
            // Includes Id, thus needs to be removed
            const newFavourites = existingUser.favourites.filter((fav) => fav !== promptId)

            existingUser.favourites = newFavourites
        } else {
            // Id not found, thus needs to be added
            existingUser.favourites.push(promptId)
        }

        await existingUser.save();

        return new Response(JSON.stringify(existingUser.favourites), { status: 200 })
    } catch (error) {
        return new Response(`Failed to update user favourites: ${error}`, { status: 500 })
    }
}