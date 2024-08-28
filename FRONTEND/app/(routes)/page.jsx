import React from 'react'
import Image from 'next/image';
import Header from '../components/homeHeader';
import { currentUser } from '@clerk/nextjs/server';
import homeimg from '../public/homeimg.avif'
import homeimg2 from '../public/homeimg2.avif'

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

                <div className="text-h10 hidden text-white/90 sm:mt-4 sm:block md:text-h9">
                  Want to have a better experience with note? <br />
                  Let <span className="font-700"> Notie </span>be your <span className="font-700">Note Bestie!</span>
                </div>

                <div className="mt-4 md:mt-8">
                  <a
                    href={user ? "/dashboard" : "/sign-in"}
                    className="font-700 text-h10 inline-block rounded border border-white bg-white px-12 py-3 text-strongViolet transition hover:bg-transparent hover:text-white focus:outline-none"
                  >
                    Let&apos;s note!
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <Image
                alt=""
                src={homeimg}
                className="h-40 w-full object-cover sm:h-56 md:h-full"
                width={774}
                height={800}
              />

              <Image
                alt=""
                src={homeimg2}
                className="h-40 w-full object-cover sm:h-56 md:h-full"
                width={774}
                height={800}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
