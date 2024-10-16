"use client"

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  // Search states
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const handleTagClick = (tag) => {
    console.log(tag)
    setSearchText(tag)
    setSearchedResults(filterPrompts(tag))
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

  const filterPrompts = (searchtext) => {
    const regex = RegExp(searchtext, 'i') // i flag makes this case-insensitive

    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    )
  }

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
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
        />
      ) : (
        <PromptCardList 
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed