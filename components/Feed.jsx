"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import PromptCard from './PromptCard';
import SignInDialog from './SignInDialog';

const PromptCardList = ({ data, handleTagClick, handleStar }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleStar={handleStar}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const { data: session } = useSession()

  // Data constants
  const [posts, setPosts] = useState([])
  const [favouritesData, setFavouritesData] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  // AlertDialog state
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const handleTagClick = (tag) => {
    setSearchText(tag)
    setSearchedResults(filterPrompts(tag))
  }

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

  // Handles changes in the search bar
  const handleSearchChange = (e) => {
    // Clears the previous timeout so it doesn't filter while you're typing
    clearTimeout(searchTimeout);

    // Sets the displayed text inside the input to whatever the user is typing
    setSearchText(e.target.value);

    // Sets a timeout of 500 so it only filters after the user finished typing
    setSearchTimeout(
      setTimeout(() => {
        setSearchedResults(filterPrompts(e.target.value))
      }, 500)
    )
  }

  const handleSetIsAlertOpen = (open) => {
    setIsAlertOpen(open)
  }

  const filterPrompts = (searchtext) => { 
    const regex = RegExp(searchtext, 'i') 
    return posts.filter( 
      (post) => 
      regex.test(post.creator.username) || 
      post.tags.some(tag => regex.test(tag)) || 
      regex.test(post.prompt) 
    ) 
  }

  const fetchData = async () => {
    
    try {
      // Fetch posts
      const postsResponse = await fetch('/api/prompt');
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
  
  // Fetch posts and favourites when the session changes
  useEffect(() => {
    fetchData();
  }, [session?.user.id]);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          id='searchBox'
          type='text'
          placeholder='Search for a phrase, tag or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
        {/* Add X button to clear input if there is text */}
        {searchText && (
          <button
            type='button'
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black'
            onClick={() => setSearchText('')} // Clear searchText when X is clicked
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {searchText ? (
        <PromptCardList 
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleStar={handleStar}
        />
      ) : (
        <PromptCardList 
          data={posts}
          handleTagClick={handleTagClick}
          handleStar={handleStar}
        />
      )}

      <SignInDialog isAlertOpen={isAlertOpen} setIsAlertOpen={handleSetIsAlertOpen} />
    </section>
  )
}

export default Feed