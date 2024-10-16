"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'

const UserProfile = ({ params }) => {
    const urlParams = useSearchParams();
    const userName = urlParams.get('name');

    const [posts, setPosts] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params?.id}/posts`);
          const data = await response.json()
            
          setPosts(data)
        }
    
        if (params?.id) fetchPosts();
    }, [params.id])

    return (
        <Profile 
            name={`${userName}'s`}
            desc={`Welcome to ${userName}'s profile page. Explore their prompts and get inspired.`}
            data={posts}
        />
    )
}

export default UserProfile
