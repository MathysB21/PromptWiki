"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter();
    const [posts, setPosts] = useState([])
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.user.id) return;

            try {
                const [favouritesRes, postsRes] = await Promise.all([
                    fetch(`/api/users/${session.user.id}/favourites`),
                    fetch(`/api/users/${session.user.id}/posts`)
                ]);

                const favouritesData = await favouritesRes.json();
                const postsData = await postsRes.json();

                // Mark each post as favourited if it exists in favourites
                const updatedPosts = postsData.map(post => ({
                    ...post,
                    favourite: favouritesData.some(favourite => favourite._id === post._id)
                }));

                const updatedFavs = favouritesData.map(post => ({
                    ...post,
                    favourite: true
                }))

                setFavourites(updatedFavs);
                setPosts(updatedPosts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id)

                setPosts(filteredPosts)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleStar = async (post) => {

        const promptId = post._id;

        // Toggle the favorite
        const isFavourited = favourites.some(fav => fav._id === promptId);
        const updatedFavourites = isFavourited 
          ? favourites.filter(fav => fav._id !== promptId)
          : [...favourites, {...post, favourite: true}];
    
        setFavourites(updatedFavourites);

        // Update posts state by toggling the favourite status of the specific post
        const updatedPosts = posts.map(post => 
            post._id === promptId 
            ? { ...post, favourite: !isFavourited } 
            : post
        );
        setPosts(updatedPosts);
    
        // Send the favorite request to the server
        try {
            await fetch(`/api/users/${session?.user.id}/favourite`, {
                method: "PATCH",
                body: JSON.stringify({ promptId })
            });
        } catch (error) {
            console.error(error);
            // Rollback if the request fails
            setFavourites(isFavourited ? [...favourites, {...post, favourite: true}] : favourites.filter(fav => fav._id !== promptId));

            // Rollback `posts` to reflect the initial `favourite` state of the specific post
            setPosts(posts.map(post => 
                post._id === promptId 
                ? { ...post, favourite: isFavourited }  // Rollback to initial state
                : post
            ));
        }
    };

    return (
        <Profile 
            name="My"
            desc="Welcome to your personal profile page"
            data={posts}
            favourites={favourites}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleStar={handleStar}
        />
    )
}

export default MyProfile
