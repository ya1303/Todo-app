// import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-950 text-white py-3"> 
    <div className="logo">
        <span className="font-bold text-xl mx-8"> I-Task</span>
    </div>
        <ul className="flex gap-8 mx-8">
            <li className="cursor-pointer hover:font-bold">Home</li>
            <li className="cursor-pointer hover:font-bold">Your Todos</li>
        </ul>
    </nav>
  )
}

export default Navbar