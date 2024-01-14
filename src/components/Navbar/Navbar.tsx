'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { rubikGlitch } from './../../utils/fonts'

export default function Navbar() {
  const [nav, setNav] = useState(false)

  const links = [
    {
      id: 1,
      link: 'home',
      route: '/',
    },
    {
      id: 2,
      link: 'my collection',
      route: `/my-collection/`,
    },
  ]

  return (
    <div
      className={`${rubikGlitch.className} flex justify-between items-center w-full h-20 px-4 z-50 border-b-2 border-yellow-700 text-blue-900 bg-yellow-600 shadow-lg shadow-yellow-800 fixed nav`}
    >
      <div>
        <h1 className="text-3xl md:text-5xl ml-2">Comic Collector</h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link, route }) => (
          <li
            key={id}
            className="nav-links px-4 cursor-pointer font-medium text-blue-900 hover:scale-105 hover:text-blue-700 duration-200 link-underline"
          >
            <Link href={route}>{link}</Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-blue-900 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-yellow-600 to-yellow-400 text-blue-900">
          {links.map(({ id, link, route }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={route}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
