import { Layout } from '../layouts/2-columns'
import { ReportsTable, type Person } from '../components/reports-table'
import { Chat } from '../components/chat'
import { useChatbot } from '../hooks/useChatbot'

const user = {
	name: 'User',
	imageUrl: '/user.png'
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
	imageUrl: '/bot.png'
}

export function ReportsPage({ navigation }: Props) {
	const { messages, isLoading, sendMessage, clearMessages } = useChatbot({
		baseUrl: 'https://ia.allup.com.co'
	})

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
					onSendMessage={sendMessage}
					onClear={clearMessages}
					isLoading={isLoading}
				/>
			}
			navigation={navigation}
		/>
	)
}
