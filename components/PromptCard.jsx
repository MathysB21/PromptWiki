"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

// Icon imports, damn React for this, hopefully I at least gain performance
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copy, setCopy] = useState('')
  const [favourite, setFavourite] = useState(post.favourite || false)

  const handleStar = async () => {
    try {
      setFavourite(!favourite)
      const response = await fetch(`/api/users/${session?.user.id}/favourite`, {
        method: "PATCH",
        body: JSON.stringify({
          promptId: post._id
        })
      })

    } catch (error) {
      console.log(error)
      setFavourite(!favourite)
    }
  }

  const handleCopy = () => {
    setCopy(post.prompt)

    navigator.clipboard.writeText(post.prompt)

    setTimeout(() => setCopy(''), 3000);
  }

  const handleProfileClick = () => {
    console.log(post)

    if (post.creator._id == session?.user.id) return router.push('/profile')

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={post.creator.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            onClick={handleProfileClick}
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900" onClick={handleProfileClick}>
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email?.replace(/(.{2})(.*)(?=@)/, "$1***")}
            </p>
          </div>
        </div>

        {/* Container for copy and star */}
        <div className="flex gap-2">

          {/* Favourite/Star */}
          <div className="copy_btn" onClick={handleStar}>
            {favourite ? (
              <StarIconSolid className="size-3 text-yellow-500"/>
            ) : (
              <StarIconOutline className="size-3 text-gray-500" />
            )}
          </div>

          {/* Copy */}
          <div className="copy_btn" onClick={handleCopy}>
            <Image
              alt="Copy button"
              src={copy === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg' }
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p 
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p 
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p 
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard