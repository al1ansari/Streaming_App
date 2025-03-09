import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"


function Header() {
  return (
    <header className='bg-black text-white p-4 flex items-center justify-between'>
      <div className='flex items-center space-x-4 lg:space-x-6'>
        <Link href="/" className='flex items-center space-x-2'>
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="JioCinema Logo"
            width={40}
            height={40}
            className="w-10 h-10 border-1 border-white"
          />
          <span >JioCinema</span>
        </Link>
        <Button variant="outline" >
          Go Premium
        </Button>
      </div>
      <nav className='hidden lg:flex items-center space-x-6'>
        <Link href="/" className='hover:text-gray-300'>Home</Link>
        <Link href="/movies" className='hover:text-gray-300'>Movies</Link>
        <Link href="/tv" className='hover:text-gray-300'>Tv Shows</Link>
        <Link href="/watchlist" className='text-pink-500 border-b-2 border-pink-500 pb-1'>Watchlist</Link>
        <Link href="/jio-plus" className='hover:text-gray-300'>Jio+</Link>
      </nav>
      <div className='flex items-center space-x-4'>
        <form className='relative'>
          <Search className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>
          <Input
            type="search"
            placeholder="Search..."
            className='bg-gray-800 pl-8 border-gray-700 focus:border-pink-500 text-white w-[200px] lg:w-[300px]'
          />
        </form>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className='sr-only'>User menu</span>
        </Button>
      </div>
    </header>
  )
}

export default Header