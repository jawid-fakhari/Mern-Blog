import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'


function FooterCom() {
    return (
        <Footer className='border border-t-8 border-teal-500'>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">

                    <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            Jawid's
                        </span>
                        Blog
                    </Link>

                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 sm: mt-5 ">
                        <li>
                            <a href="/" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="https://fakhari-portfolio.vercel.app/" className="hover:underline me-4 md:me-6" target='_blank'>Portoflio</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/fakhari-jawid/" className="hover:underline me-4 md:me-6" target='_blank'>Linkedin</a>
                        </li>
                        <li>
                            <a href="https://github.com/jawid-fakhari" className="hover:underline" target='_blank'>Github</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://fakhari-portfolio.vercel.app/" className="hover:underline">Jawid'sBlog</a>. All Rights Reserved.</span>
            </div>
        </Footer>
    )
}

export default FooterCom