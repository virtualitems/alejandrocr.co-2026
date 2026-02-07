import { type ReactNode } from 'react'
import { Link } from 'react-router'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

type User = {
  name: string
  email: string
  imageUrl: string
}

type NavItem = {
  name: string
  href: string
  current?: boolean
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type Props = {
  title?: string
  navigation: NavItem[]
  user: User
  children: ReactNode
}

export function AppShell(props: Props) {
  const { title, navigation, user, children } = props
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="bg-indigo-600 pb-42 dark:bg-indigo-800">
        <Disclosure
          as="nav"
          className="border-b border-indigo-300/25 bg-indigo-600 lg:border-none dark:border-indigo-400/25 dark:bg-indigo-800"
        >
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400/25 dark:lg:border-indigo-400/25">
              <div className="flex items-center px-2 lg:px-0">
                <div className="shrink-0">
                  <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=300"
                    className="block size-8"
                  />
                </div>
                <div className="hidden lg:ml-10 lg:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current
                            ? 'bg-indigo-700 text-white dark:bg-indigo-950/40'
                            : 'text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-end px-2 lg:ml-6" />
              <div className="flex lg:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500/75 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white dark:bg-indigo-800 dark:hover:bg-indigo-700/75">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block size-6 group-data-open:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden size-6 group-data-open:block"
                  />
                </DisclosureButton>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="relative shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="size-6" />
                  </button>

                  <Menu as="div" className="relative ml-3 shrink-0">
                    <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src={user.imageUrl}
                        className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                      />
                    </MenuButton>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:-outline-offset-1 dark:outline-white/10"
                    >
                      <MenuItem>
                        <a
                          href="https://example.com"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-200 dark:data-focus:bg-white/5"
                        >
                          Your profile
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="https://example.com"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-200 dark:data-focus:bg-white/5"
                        >
                          Settings
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          href="https://example.com"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden dark:text-gray-200 dark:data-focus:bg-white/5"
                        >
                          Sign out
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <DisclosurePanel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames(
                    item.current
                      ? 'bg-indigo-700 text-white dark:bg-indigo-950/40'
                      : 'text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-indigo-700 pt-4 pb-3 dark:border-indigo-800">
              <div className="flex items-center px-5">
                <div className="shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-indigo-300">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <DisclosureButton
                  as="a"
                  href="https://example.com"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75"
                >
                  Your profile
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="https://example.com"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75"
                >
                  Settings
                </DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="https://example.com"
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500/75 dark:hover:bg-indigo-700/75"
                >
                  Sign out
                </DisclosureButton>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
        {title ? (
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {title}
              </h1>
            </div>
          </header>
        ) : null}
      </div>

      <main className="h-full -mt-32">{children}</main>

      <footer>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left dark:border-gray-700 dark:text-gray-400">
            <span className="block sm:inline">
              &copy; 2021 Your Company, Inc.
            </span>{' '}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
