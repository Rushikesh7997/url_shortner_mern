import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
// import { queryClient } from "../main.jsx"

const UrlForm = () => {

    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState();
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState(null)
    const [customSlug, setCustomSlug] = useState("")
    const {isAuthenticated} = useSelector((state)=>state.auth)


    const handleSubmit = async () =>{
        try {
            const shortUrl = await createShortUrl(url,customSlug);
            setShortUrl(shortUrl);
            // queryClient.invalidateQueries({queryKey: ['userUrls']})
            setError(null)
        } catch (error) {
            setError(error.message)
        }
    }

    const handleCopy = () => {
            navigator.clipboard.writeText(shortUrl).then(() => {
            setIsCopied(true);
            // Reset the copied state after 2 seconds 
            setTimeout(() => {
                setIsCopied(false)
            }, 2000); 
        });
    };

  return (
    <>
        <div>
            <div className="flex flex-col space-y-4">
                <input
                type="url"
                value={url}
                onInput={(event)=>setUrl(event.target.value)}
                placeholder="https://enter-your-long-url-here.com"
                className="w-full px-4 py-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                
                />
                <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                Short Url
                {/* {isLoading ? 'Shortening...' : 'Shorten!'} */}
                </button>

                {isAuthenticated && (
                    <div className='mt-4'>
                        <label htmlFor='customSlug' className='block text-sm font-medium text-white mb-2'>
                            Custom Url (Optional)
                        </label>
                        <input 
                            type="text"
                            id='customUrl'
                            value={customSlug}
                            onChange={(event)=>setCustomSlug(event.target.value)}
                            placeholder='Enter Custom Url'
                            className='w-full px-4 py-3 bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
                        />
                    </div>
                )}

            </div>
        </div>

        {/* --- Result and Error Display --- */}
        <div className="mt-6 h-16">
            {error && (
                <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                <p>{error}</p>
                </div>
            )}
            
            {shortUrl && (
                <div className="bg-gray-700 p-4 rounded-lg flex items-center justify-between animate-fade-in">
                <a 
                    href={shortUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-mono text-green-400 truncate hover:underline"
                >
                    {shortUrl}
                </a>
                <button
                    onClick={handleCopy}
                    className={`px-4 py-2 ml-4 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                    isCopied
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
                    }`}
                >
                    {isCopied ? 'Copied!' : 'Copy'}
                </button>
                </div>
            )}
        </div>
    </>
  )
}

export default UrlForm