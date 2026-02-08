import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message } from '../components/chat'

type ChatState = {
	messages: Message[]
	isLoading: boolean
	addMessage: (message: Message) => void
	updateMessage: (id: string, text: string) => void
	setLoading: (loading: boolean) => void
	clearMessages: () => void
}

const initialMessages: Message[] = [
	{
		id: '1',
		text: 'Hello! How can I help you today?',
		sender: 'bot',
		timestamp: new Date()
	}
]

export const useChatStore = create<ChatState>()(
	persist(
		(set) => ({
			messages: initialMessages,
			isLoading: false,
			addMessage: (message) =>
				set((state) => ({
					messages: [...state.messages, message]
				})),
			updateMessage: (id, text) =>
				set((state) => ({
					messages: state.messages.map((msg) =>
						msg.id === id ? { ...msg, text } : msg
					)
				})),
			setLoading: (loading) =>
				set({ isLoading: loading }),
			clearMessages: () =>
				set({ messages: initialMessages })
		}),
		{
			name: 'chat-storage'
		}
	)
)
