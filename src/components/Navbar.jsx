import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-black text-white'>
        <div className="mycontainer flex justify-around
        items-center px-4 py-5 h-14">
        <div className='logo font-bold text-white text-2xl'>
            <span className='text-sky-400 font-bold'> &lt; </span>
                Lock-
            <span className='text-sky-400 font-bold'>Safe/&gt; </span>
        </div>
        {/* <ul>
            <li className='flex gap-8'>
                <a className='hover:font-bold text-white' href="/">Home</a>
                <a className='hover:font-bold text-white' href="#">About</a>
                <a className='hover:font-bold text-white' href="#">Contact</a>
            </li>
        </ul> */}
        <button className='text-black bg-sky-500 my-1 rounded-full flex justify-between items-center hover:bg-sky-700 ring-black ring-1'>
            <img className='w-10 p-1 px-2 py-1' src="icons/github.png" alt="github"/>
            <a href="#" className='font-bold px-2'>GitHub</a>
        </button>
        </div>
        
    </nav>
  )
}

export default Navbar
