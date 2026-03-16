import { Layout } from '../layouts/1-column'
import type { NavigationItem } from '../types/navigation'

type Props = {
  navigation: NavigationItem[]
}

export function ContactPage({ navigation }: Props) {
  const contacts = [
    {
      name: 'Website',
      url: 'https://alejandrocr.co',
      description: 'Visit my personal website',
      icon: '🌐'
    },
    {
      name: 'Github',
      url: 'https://github.com/virtualitems',
      description: 'Check out my projects',
      icon: '💻'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alejandro-carrasco-web-ai-engineer',
      description: 'Connect professionally',
      icon: '💼'
    },
    {
      name: 'Email',
      url: 'mailto:contacto@alejandrocr.co',
      description: 'Send an mail',
      icon: '✉️',
      external: false
    }
  ]

  return (
    <Layout
      navigation={navigation}
      columnTitle="Contact"
      columnWidth="4xl"
      columnNode={
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Choose a channel below to get in touch, explore my work, or connect
            professionally.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((contact) => (
              <a
                key={contact.name}
                href={contact.url}
                target={contact.external === false ? undefined : '_blank'}
                rel={
                  contact.external === false ? undefined : 'noopener noreferrer'
                }
                className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-indigo-300 cursor-pointer dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-600"
              >
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full group-hover:duration-700" />
                <div className="relative flex items-center gap-3">
                  <div className="text-4xl">{contact.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {contact.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {contact.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      }
    />
  )
}
