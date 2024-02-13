import { useState, Fragment } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/24/outline'
import Logo from '../../images/common/logo.png'
import Profile from '../../images/common/profile.png'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../../features/login/authSlice'
import axios from 'axios'
import { setAccessToken } from '../../features/login/accessSlice'
import { error, get } from 'jquery'
import swal from 'sweetalert'
import '../css/dropdown.css'



const navigation = [ 
  { name: 'Problem', href: '/problem'},
  { name: 'Arena', href: '/arena'},
  { name: 'Community', href: '/community' },
  { name: 'Login', href: '/login'},
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const isLogin = useSelector(state => state.auth.isLogin);
  const nickName = useSelector(state => state.auth.userNickname)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const filterNav = isLogin ? navigation.filter(item => item.name != 'Login') : navigation;

  const handleLogout = ()=>{
    dispatch(logout());
    dispatch(setAccessToken(null));
    swal("로그아웃되었습니다", "", "success");
    navigate('/')
  }

  const [showDropdown,setShowDropdown ] = useState(false)

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
            <div className="relative flex h-16 justify-start mb-5">
              <div className="flex flex-1 justify-between align-middle mx-20">
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
                    {filterNav.map((item) => (
                      <div key={item.name} className='relative'>
                      <Link
                        key={item.name} 
                        to={item.href}
                        className={classNames(
                         'text-xl rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white'
                        )}
                        onMouseEnter={() => setShowDropdown(item.name ==='Problem' ? true : false)}
                        onMouseLeave={() => setShowDropdown(false)}
                      >
                        {item.name}
                      </Link>
                      {/* // 드롭다운 메뉴위치 */}
                      {item.name === 'Problem' && showDropdown && (
                        <div className="absolute top-full left-0 rounded-md z-50 mt-0.5" style={{backgroundColor:'#F4F5F1'}}
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                        >
                          {/* <Link to="/problem/submit" className="text-xl block rounded-md px-3 py-3 font-medium hover:bg-gray-700 hover:text-white">Submit</Link> */}
                          <Link to="/problem/tagList" className="text-xl block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white">Category</Link>
                        </div>
                      )}
                      </div>
                    ))}
                  {/* 벨아이콘 알림함 */}
                    { isLogin && (
                      <button
                        type="button"
                        className="relative rounded-full p-1"
                        onClick={()=>{navigate('/profile/alarm')}}
                        >
                        <BellIcon className="h-6 w-6 hover:scale-125" aria-hidden="true"  style={{ transition: 'transform 0.2s' }}/> 
                      </button>
                    )}
                  {/* 프로필 드롭다운위치 */}
                    {isLogin && (
                      <Menu as="div" className="relative ml flex">
                        <div className="my-auto">
                          <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2
                          hover:scale-110" style={{ transition: 'transform 0.2s' }}>
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
                      <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none top-full">
                        <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(active ? 'bg-white' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                              {nickName}님 환영합니다
                              </a>
                            )}
                          </Menu.Item>
                          
                          
                          <Link to={`/profile/${nickName}`}>
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
                              onClick={handleLogout}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                      </Transition>
                      </Menu>
                    )}     
                  </div>
                </div>
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
