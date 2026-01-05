import React from 'react'
import { useContext } from 'react';
import { ThemeContext } from "./ThemeToggle";
const ThemeApp :React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);


  return (
    <div className={`border-2 min-w-full min-h-[300px] flex flex-col items-center  gap-2 ${theme === 'light' ? 'bg-white text-black': 'bg-slate-950 text-white'}`}>
        <h1 className={` text-3xl font-bold ${theme === 'light' ? 'text-black': 'text-white'}`}>Theme App</h1>

        <button 
        className={`rounded-xl p-2 px-4 border ${theme === 'light' ? 'bg-slate-950 text-white hover:bg-white hover:text-black  hover:border-black' : 'bg-white text-black hover:bg-slate-950 hover:text-white' }`}
        onClick={toggleTheme}
        >{theme}
        </button>
    </div>
  )
}

export default ThemeApp;