"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id')

    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tags: ''
    })

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)

            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tags: data.tags.join(' #')
            })
        }

        if (promptId) getPromptDetails()
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found")

        try {
            const formattedTags = post.tags.split('#').map(tag => tag.trim()).filter(tag => tag !== '').map(tag =>`#${tag}`);
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tags: formattedTags
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
  
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt