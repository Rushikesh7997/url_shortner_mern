import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FiCopy, FiBarChart2, FiLink } from 'react-icons/fi';
import { getAllUserUrls } from '../api/user.api.js';

const UserUrl = () => {
    
    const {data: urls, isLoading, isError, error} = useQuery({
        queryKey: ['userUrls'],
        queryFn: getAllUserUrls,
        refetchInterval: 30000,
        staleTime:0,
    })

    const [copiedId, setCopiedId] = useState(null)
    const handleCopy = (urls, id) => {
        navigator.clipboard.writeText(urls).then(() => {
        setCopiedId(id);
        setTimeout(() => {
            setCopiedId(null)
        }, 2000); // Reset feedback after 2 seconds
        });
    };

    if(isLoading){
        return (
            <div className="flex justify-center my-8">
                <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-sky-500"></span>
                </span>
            </div>
        )
    }

     if(isError){
        return (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-4'>
               Error loading your URLs: {error.message}
            </div>
        )
    }

    if(!urls.urls || urls.urls.length === 0){
        return (
            <div>
                <div className="flex justify-center items-center p-8">
                    <div className="text-center bg-gray-800 p-10 rounded-xl shadow-lg border border-gray-700">
                        
                        {/* Icon */}
                        <div className="flex justify-center items-center mx-auto h-16 w-16 rounded-full bg-gray-700 mb-6">
                        <FiLink className="text-blue-400" size={32} />
                        </div>

                        {/* Heading */}
                        <h2 className="text-2xl font-bold text-white mb-2">
                        No Links Yet
                        </h2>

                        {/* Message */}
                        <p className="text-gray-400 max-w-sm mb-8">
                        You haven't created any shortened URLs. Get started by creating your first one!
                        </p>
                    </div>
                </div>
            </div>
        )
    }
    
  return (
     <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Your Links</h1>
        
        {/* List of URL Cards */}
        <div className="space-y-4 ">
          {urls.urls.reverse().map((url) => {
            const isCopied = copiedId === url._id;
            return (
              <div key={url._id} className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                {/* URLs Section */}
                <div className="flex-grow overflow-hidden">
                  <a 
                    href={`http://localhost:3000/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-lg text-blue-400 hover:underline"
                  >
                    {url.short_url}
                  </a>
                  <p 
                    className="text-sm text-gray-400 truncate mt-1"
                    title={url.full_url}
                  >
                    {url.full_url}
                  </p>
                </div>

                {/* Clicks and Actions Section */}
                 <div className="flex items-center flex-shrink-0 space-x-4 sm:space-x-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <FiBarChart2 />
                    <span className="font-semibold">{url.clicks.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(url.short_url, url._id)}
                    className={`flex items-center px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                      isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                    }`}
                  >
                    <FiCopy className="mr-2" />
                    {isCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default UserUrl