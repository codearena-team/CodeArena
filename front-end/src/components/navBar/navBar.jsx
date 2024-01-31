import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import Logo from '../../images/common/logo.png'
import Profile from '../../images/common/profile.png'

const navigation = [ 
  // { name: 'test', href: '/test', current: false },
  // { name: 'Logout', href: '/logout', current: false },
  // { name: 'Profile', href: '/profile', current: false },
  { name: 'Community', href: '/Community', current: false },
  { name: 'problem', href: '/problem', current: false },
  { name: 'Arena', href: '/arena', current: false },
  { name: 'Login', href: '/login', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          
            <div className="relative flex h-16 justify-start mb-5">
              <div className="flex-initial absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 justify-between align-middle">
                <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                  <img
                    className="h-full w-auto mt-3"
                    src={Logo}
                    alt="Your Company"
                  />
                </Link>
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name} 
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-xl hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      type="button"
                      className="relative rounded-full p-1
                      hover:text-white"
                      >
                      <BellIcon className="h-6 w-6" aria-hidden="true" /> 
                    </button>
                  {/* 프로필 드롭다운위치 */}
                    <Menu as="div" className="relative ml flex">
                      <div className="my-auto">
                        <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={Profile}
                          alt=""
                        />
                        </Menu.Button>
                      </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-full">
                      <Link to='/profile/:nickname'>
                        <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profile
                          </a>
                        )}
                        </Menu.Item>
                      </Link>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                    </Transition>
                    </Menu>      
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              </div>
            </div>
     
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
