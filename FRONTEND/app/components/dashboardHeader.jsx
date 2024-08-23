import React from "react"
import Image from "next/image"
import Logo from '../public/note.png'
import { currentUser } from '@clerk/nextjs/server';
import { UserButton, SignedOut } from "@clerk/nextjs";

const DashboardHeader = async() => {
    const user = await currentUser();

    return (
        <div> 
            <header className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="block text-teal-600" href={user? "/dashboard" : "/sign-in"}>
                        
                        <Image alt="logo" src={Logo} height={50} width={50}/>
                        
                        </a>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                            <a className="text-gray-500 transition hover:text-strongViolet" href="/about"> About </a>
                            </li>

                            <li>
                            <a className="text-gray-500 transition hover:text-strongViolet" href="#"> Dashboard </a>
                            </li>

                            <li>
                            <a className="text-gray-500 transition hover:text-strongViolet" href="#"> Something </a>
                            </li>

                            <li>
                            <a className="text-gray-500 transition hover:text-strongViolet" href="#"> Services </a>
                            </li>
                        </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                          
                            {user? 
                            (
                                <div className="hidden sm:flex">
                                <a
                                    className="rounded-md bg-white border border-strongViolet px-5 py-2.5 text-sm font-medium text-strongViolet shadow-custom
                                                hover:bg-strongViolet hover:text-white transition"
                                    href="/"
                                >
                                    <SignedOut />
                                    Sign out
                                </a>
                                </div>
                            ) : null
                            }
                            
                            {
                                user? (
                                    <div className="flex">
                                        <UserButton />
                                    </div>
                                ) : null
                            }
                            
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
            </header>
        </div>
    )
}

export default DashboardHeader;
