"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile';
import SignInDialog from '@components/SignInDialog';

const UserProfile = ({ params }) => {
    const { data: session } = useSession()
    const urlParams = useSearchParams();
    const userName = urlParams.get('name');

    const [posts, setPosts] = useState([]);
    const [favouritesData, setFavouritesData] = useState([])

    // AlertDialog state
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    const fetchData = async () => {
    
        try {
          // Fetch posts
          const postsResponse = await fetch(`/api/users/${params?.id}/posts`);
          const postsData = await postsResponse.json();
      
          setPosts(postsData);
      
          if (session?.user.id) {
            // Fetch favourites if session exists
            const userFavsResponse = await fetch(`/api/users/${session.user.id}/favourites`);
            const favouritesData = await userFavsResponse.json();
            setFavouritesData(favouritesData);
      
            // Update the favourite status of posts
            const updatedPosts = postsData.map(post => ({
              ...post,
              favourite: favouritesData.some(fav => fav._id === post._id)
            }));
            
            setPosts(updatedPosts);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (params?.id) fetchData();
    }, [params.id, session?.user.id])

    const handleStar = async (post) => {

        if (!session?.user.id) {
          // Show alert dialog if no session exists
          setIsAlertOpen(true);
          return; // Early exit if there's no session
        }
    
        const promptId = post._id;
    
        const isFavourited = favouritesData.some(fav => fav._id === promptId);
        const updatedFavourites = isFavourited 
          ? favouritesData.filter(fav => fav._id !== promptId)
          : [...favouritesData, {...post, favourite: true}];
    
        setFavouritesData(updatedFavourites);
    
        // Update posts state by toggling the favourite status of the specific post
        setPosts(() => posts.map(post => 
          post._id === promptId 
          ? { ...post, favourite: !isFavourited } 
          : post
        ));
    
        try {
          const response = await fetch(`/api/users/${session?.user.id}/favourite`, {
            method: "PATCH",
            body: JSON.stringify({ promptId })
          })
    
        } catch (error) {
          console.log(error)
          // Rollback if the request fails
          setFavouritesData(isFavourited ? [...favouritesData, {...post, favourite: true}] : favouritesData.filter(fav => fav._id !== promptId));
    
          // Rollback `posts` to reflect the initial `favourite` state of the specific post
          setPosts(posts.map(post => 
            post._id === promptId 
            ? { ...post, favourite: isFavourited }  // Rollback to initial state
            : post
          ));
        }
    }

    const handleSetIsAlertOpen = (open) => {
        setIsAlertOpen(open)
    }

    return (
        <>
            <Profile
                name={`${userName}'s`}
                desc={`Welcome to ${userName}'s profile page. Explore their prompts and get inspired.`}
                data={posts}
                handleStar={handleStar}
            />
            <SignInDialog isAlertOpen={isAlertOpen} setIsAlertOpen={handleSetIsAlertOpen} />
        </>
    )
}

export default UserProfile
