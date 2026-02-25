import axios from 'axios'
import type { Idea } from '@/types'

export const getIdea = async (id: string): Promise<Idea> => {
  try {
    const { data } = await axios(`${import.meta.env.VITE_API}/ideas/${id}`, {
      timeout: 500,
    })
    return data
  } catch (e) {
    throw new Error('No user found')
  }
}

export const getIdeas = async (num: number = 0): Promise<Idea[]> => {
  try {
    const { data } = await axios(`${import.meta.env.VITE_API}/ideas`, {
      timeout: 500,
    })
    const ideas = [...data].sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    return num === 0 ? ideas : ideas.slice(0, num)
  } catch (e) {
    throw new Error('No user found')
  }
}

export const createIdea = async (newIdea: {
  title: string
  summary: string
  description: string
  tags: string[]
}): Promise<Idea> => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API}/ideas`,
      { ...newIdea, createdAt: new Date().toISOString() },
      {
        timeout: 500,
      },
    )
    return data
  } catch (e) {
    throw new Error('No idea created')
  }
}

export const deleteIdea = async (id: string): Promise<void> => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API}/ideas/${id}`,
      {
        timeout: 500,
      },
    )
    return data
  } catch (e) {
    throw new Error('No idea deleted')
  }
}

export const updateIdea = async (
  id: string,
  idea: {
    title: string
    summary: string
    description: string
    tags: string[]
  },
): Promise<Idea> => {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API}/ideas/${id}`,
      { ...idea, createdAt: new Date().toISOString() },
      {
        timeout: 500,
      },
    )
    return data
  } catch (e) {
    throw new Error('No idea saved')
  }
}
