import { useState } from 'react'
import { Layout } from '../layouts/2-columns'
import { ReportsTable, type Person } from '../components/reports-table'
import { Chat, type Message } from '../components/chat'

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const people: Person[] = [
	{
		name: 'Lindsay Walton',
		timestamp: '2024-12-01T08:30:00Z',
		image: 'https://example.com/image.jpg'
	},
	{
		name: 'Courtney Henry',
		timestamp: '2024-12-02T10:15:00Z',
		image: 'https://example.com/image.jpg'
	},
	{
		name: 'Tom Cook',
		timestamp: '2024-12-03T12:00:00Z',
		image: 'https://example.com/image.jpg'
	},
	{
		name: 'Whitney Francis',
		timestamp: '2024-12-04T15:45:00Z',
		image: 'https://example.com/image.jpg'
	},
	{
		name: 'Leonard Krasner',
		timestamp: '2024-12-05T09:05:00Z',
		image: 'https://example.com/image.jpg'
	},
	{
		name: 'Floyd Miles',
		timestamp: '2024-12-06T11:20:00Z',
		image: 'https://example.com/image.jpg'
	}
]

type Props = {
	navigation: { name: string; href: string; current: boolean }[]
}

const bot = {
	name: 'AI Assistant',
	imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const initialMessages: Message[] = [
	{
		id: '1',
		text: 'Hello! How can I help you today?',
		sender: 'bot',
		timestamp: new Date()
	}
]

async function sendMessageToAPI(message: string, onChunk: (chunk: string) => void): Promise<void> {
	try {
		const formdata = new FormData()
		formdata.append('q', message)

		const response = await fetch('https://ia.allup.com.co/chatbot/text-to-text', {
			method: 'POST',
			body: formdata,
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const reader = response.body?.getReader()
		if (!reader) {
			throw new Error('No reader available')
		}

		const decoder = new TextDecoder()

		while (true) {
			const { done, value } = await reader.read()
			if (done) break

			const chunk = decoder.decode(value, { stream: true })
			onChunk(chunk)
		}
	} catch (error) {
		console.error('Error sending message:', error)
		throw error
	}
}

export function ReportsPage({ navigation }: Props) {
	const [messages, setMessages] = useState<Message[]>(initialMessages)
	const [isLoading, setIsLoading] = useState(false)

	const handleSendMessage = async (message: string) => {
		// Add user message
		const userMessage: Message = {
			id: Date.now().toString(),
			text: message,
			sender: 'user',
			timestamp: new Date()
		}

		setMessages((prev) => [...prev, userMessage])
		setIsLoading(true)

		// Create bot message placeholder
		const botMessageId = (Date.now() + 1).toString()
		const botMessage: Message = {
			id: botMessageId,
			text: '',
			sender: 'bot',
			timestamp: new Date()
		}

		setMessages((prev) => [...prev, botMessage])

		try {
			await sendMessageToAPI(message, (chunk) => {
				setMessages((prev) => {
					const updated = [...prev]
					const lastMessage = updated[updated.length - 1]
					if (lastMessage && lastMessage.id === botMessageId) {
						lastMessage.text += chunk
					}
					return updated
				})
			})
		} catch (error) {
			setMessages((prev) => {
				const updated = [...prev]
				const lastMessage = updated[updated.length - 1]
				if (lastMessage && lastMessage.id === botMessageId) {
					lastMessage.text = 'Sorry, there was an error processing your message.'
				}
				return updated
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Layout
			leftColumnTitle="Table"
			leftColumnNode={<ReportsTable people={people} />}
			rightColumnTitle="Chat"
			rightColumnNode={
				<Chat
					height="md"
					user={user}
					bot={bot}
					messages={messages}
					onSendMessage={handleSendMessage}
					isLoading={isLoading}
				/>
			}
			navigation={navigation}
		/>
	)
}
