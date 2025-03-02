import Link from 'next/link';

export default function Custom404() {
    return (
        <main className="grid h-[calc(100vh-90px)] place-items-center px-10">
            <div className="text-center">
                <p className="font-semibold text-primary text-7xl">404</p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-gray-900">Resource not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the resource you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/" className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Go back home</Link>
                </div>
            </div>
        </main>
    )
}