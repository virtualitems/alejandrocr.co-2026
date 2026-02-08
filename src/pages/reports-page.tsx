import { Layout } from '../layouts/2-columns'
import { ReportsTable } from '../components/reports-table'
import { Chat } from '../components/chat'
import { useChatbot } from '../hooks/useChatbot'
import { useReports } from '../hooks/useReports'

const user = {
	name: 'User',
	imageUrl: '/user.png'
}

type Props = {
	navigation: { name: string; href: string; current: boolean }[]
}

const bot = {
	name: 'AI Assistant',
	imageUrl: '/bot.png'
}

export function ReportsPage({ navigation }: Props) {
	const { reports, isLoading, deleteReport } = useReports()
	const { messages, isLoading: isChatLoading, sendMessage, clearMessages } = useChatbot({
		baseUrl: 'https://ia.allup.com.co'
	})

	const handleDelete = async (id: number) => {
		await deleteReport(id)
	}

	return (
		<Layout
			leftColumnTitle="Reports"
			leftColumnNode={<ReportsTable reports={reports} isLoading={isLoading} onDelete={handleDelete} />}
			rightColumnTitle="Chat"
			rightColumnNode={
				<Chat
					height="md"
					user={user}
					bot={bot}
					messages={messages}
					onSendMessage={sendMessage}
					onClear={clearMessages}
					isLoading={isChatLoading}
				/>
			}
			navigation={navigation}
		/>
	)
}
