import React from "react"


interface ButtonProps {
    children: React.ReactNode;
    onClick : ()=> void
}

export default function Button ({children,onClick}:ButtonProps) {
    return (
    <button 
        onClick={onClick} 
        className="text-white font-semibold bg-blue-700 focus:to-blue-300 ring-1 hover:bg-gray-900 px-5 py-2 rounded-md">
            {children}
    </button>
    )
}