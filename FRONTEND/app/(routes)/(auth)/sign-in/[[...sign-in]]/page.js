' use client '
import React from "react";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import signin from '../../../../public/sign-in.jpg'
import logo from '../../../../public/note.png'

export default function SigninPage() {
  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="Sign in image"
              src={signin}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <a className="block text-white" href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  width={56} // Set width for the logo
                  height={32} // Set height for the logo
                  
                />
              </a>

              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to <strong className="font-extrabold text-strongViolet">Notie</strong> !
              </h2>

              <p className="mt-4 leading-relaxed text-white/90">
                  Want to have a better experience with note? <br />
                  Let <span className="font-700"> Notie </span>be your <span className="font-700">Note Bestie!</span>
              </p>
            </div>
          </section>

          <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
          >
            < SignIn />
          </main>
        </div>
      </section>
    </div>
  )
}