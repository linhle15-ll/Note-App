import React from 'react'
import Header from '../components/homeHeader';
import { currentUser } from '@clerk/nextjs/server';

export default function Home() {

  const user = currentUser();

  return (
    <div>
      <Header />
      <section>
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-strongViolet p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <div className="text-h5 font-bold text-white md:text-h4">
                  Welcome to NOTIE
                </div>

                <p className="text-h10 hidden text-white/90 sm:mt-4 sm:block md:text-h9">
                  Want to have a better experience with note? <br />
                  Let <span className="font-700"> Notie </span>be your <span className="font-700">Note Bestie!</span>
                </p>

                <div className="mt-4 md:mt-8">
                  <a
                    href={user ? "/dashboard" : "/sign-in"}
                    className="font-700 text-h10 inline-block rounded border border-white bg-white px-12 py-3 text-strongViolet transition hover:bg-transparent hover:text-white focus:outline-none"
                  >
                    Let's note!
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />

              <img
                alt=""
                src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
