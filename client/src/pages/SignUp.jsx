import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    return <div className='min-h-scree mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
            {/* left */}
            <div className='flex-1'>
                <Link to="/" className='font-bold dark:text-white text-4xl'>
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Jawid's
                    </span>
                    Blog
                </Link>
                <p className='text-sm mt-5'>This is a demo project for my portfolio, you can SignUp with your email and password or with your google account</p>
            </div>
            {/* right */}
            <div className='flex-1'>
                <form>
                    <div className='flex flex-col'>
                        <Label value='Username: ' />
                        <TextInput
                            type='text'
                            placeholder='your username'
                            id='username' />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <Label value='Email: ' />
                        <TextInput
                            type='email'
                            placeholder='your email address'
                            id='email' />
                    </div>
                    <div className='flex flex-col mt-3'>
                        <Label value='password: ' />
                        <TextInput
                            type='Password'
                            placeholder='your password'
                            id='password' />
                    </div>
                    <Button className='w-full mt-7' gradientDuoTone='purpleToPink' type='submit'>
                        Submit
                    </Button>
                    <span className='flex gap-2 mt-5'>
                        Do you an account?
                        <Link to='/signin' className=' text-blue-500'>
                            Sign In
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    </div>
}
