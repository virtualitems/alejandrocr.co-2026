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

const navigation = [
	{ name: 'About', href: '#', current: false },
	{ name: 'Persons', href: '/persons', current: false },
	{ name: 'Inspector', href: '#', current: false },
	{ name: 'Reports', href: '/reports', current: true },
	{ name: 'Contact', href: '#', current: false }
]

const userNavigation = [
	{ name: 'Your profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' }
]

const bot = {
	name: 'AI Assistant',
	imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
}

const initialMessages: Message[] = [
	{
		id: '1',
		text: 'Hello! How can I help you today?',
		sender: 'bot',
		timestamp: new Date('2024-12-06T10:00:00Z')
	},
	{
		id: '2',
		text: 'Hi! I have a question about your portfolio.',
		sender: 'user',
		timestamp: new Date('2024-12-06T10:01:00Z')
	},
	{
		id: '3',
		text: "Sure! I'd be happy to help. What would you like to know?",
		sender: 'bot',
		timestamp: new Date('2024-12-06T10:01:30Z')
	}
]

export function ReportsPage() {
	return (
		<Layout
			leftColumnTitle="Table"
			leftColumnNode={<ReportsTable people={people} />}
			rightColumnTitle="Chat"
			rightColumnNode={
				<Chat
					user={user}
					bot={bot}
					initialMessages={initialMessages}
					onSendMessage={(message) => {
						console.log('Message sent:', message)
					}}
				/>
			}
			navigation={navigation}
			user={user}
			userNavigation={userNavigation}
		/>
	)
}
