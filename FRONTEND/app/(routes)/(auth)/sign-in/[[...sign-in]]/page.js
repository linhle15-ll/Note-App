import React from "react"

const Page = () => {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-strongViolet p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Need an ALL IN ONE Note Assistant?
                </h2>

                <p className="hidden text-white/90 sm:mt-4 sm:block">
                  Let <span className="font-700">NOTIE</span> be be your <span className="font-700">Note Bestie</span> <br/>
                  Notie, make Noting easy!
                </p>

                <div className="mt-4 md:mt-8">
                  <a
                    href="/sign-in"
                    className="inline-block rounded-[50px] border border-white bg-white px-12 py-3 text-h10 text-strongViolet font-700 transition hover:bg-transparent hover:text-white focus:outline-none"
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
  )
}

export default Page;