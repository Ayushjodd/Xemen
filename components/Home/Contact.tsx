"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Card, CardContent, CardHeader } from "../ui/card"; 
import { Button } from "../ui/newButton";
import Appbar from "../Appbar/Appbar";
import { useState } from "react";

export const Contact = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
    const { clientX: x, clientY: y } = e;
    setCursorPos({ x, y });
  };

  const appbarTransform = `translate(-${cursorPos.x / 20}px, -${cursorPos.y / 20}px)`;
  const cardTransform = `translate(-${cursorPos.x / 10}px, -${cursorPos.y / 10}px)`;

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-8 px-4"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="mt-10 mx-48 mb-4 bg-white p-3 rounded-md max-w-3xl w-full"
        style={{ transform: appbarTransform }}
      >
        <Appbar />
      </div>
      <div className="w-full max-w-3xl">
        <Card 
          className="bg-white border border-gray-300 rounded-lg shadow-2xl p-6 transform transition-transform hover:scale-105 hover:shadow-xl duration-500 ease-in-out"
          style={{ transform: cardTransform }}
        >
          <CardHeader className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-800">Contact Us</h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-6">
              <Button
                className="flex items-center bg-gradient-to-r from-gray-800 to-gray-600 text-white py-2 px-4 rounded-lg hover:from-gray-700 hover:to-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => window.open("https://github.com/Ayushjodd/Xemen")}
              >
                <FaGithub className="mr-2 text-xl" />
                Github Repository
              </Button>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-center text-gray-700">Contributors</h1>
              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ayush</h2>
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    className="flex items-center bg-gradient-to-r from-gray-800 to-gray-600 text-white py-2 px-4 rounded-lg hover:from-gray-700 hover:to-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => window.open("https://github.com/Ayushjodd")}
                  >
                    <FaGithub className="mr-2 text-xl" />
                    Github Profile
                  </Button>
                  <Button
                    className="flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => window.open("https://www.linkedin.com/in/ayush-jangra-9992a82a3")}
                  >
                    <FaLinkedin className="mr-2 text-xl" />
                    LinkedIn Profile
                  </Button>
                  <Button
                    className="flex items-center bg-gradient-to-r from-blue-400 to-blue-300 text-white py-2 px-4 rounded-lg hover:from-blue-300 hover:to-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => window.open("https://x.com/AyushIsCoding")}
                  >
                    <FaTwitter className="mr-2 text-xl" />
                    Twitter
                  </Button>
                </div>
              </div>

              <div className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">Rudra Sankha</h2>
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    className="flex items-center bg-gradient-to-r from-gray-800 to-gray-600 text-white py-2 px-4 rounded-lg hover:from-gray-700 hover:to-gray-500 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => window.open("https://github.com/rushhaaland")}
                  >
                    <FaGithub className="mr-2 text-xl" />
                    Github Profile
                  </Button>
                  <Button
                    className="flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-400 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => window.open("https://www.linkedin.com/in/rudra-sankha-sinhamahapatra-6311aa1bb")}
                  >
                    <FaLinkedin className="mr-2 text-xl" />
                    LinkedIn Profile
                  </Button>
                  <Button
                    className="flex items-center bg-gradient-to-r from-blue-400 to-blue-300 text-white py-2 px-4 rounded-lg hover:from-blue-300 hover:to-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => window.open("https://x.com/RudraSankha")}
                  >
                    <FaTwitter className="mr-2 text-xl" />
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
