
import React from 'react'
import Link from 'next/link'
import { HandMetal } from 'lucide-react'

function Footer() {
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center w-full p-8">
            <Link href="https://quickpa.ge/cae" className="w-fit text-sm py-16 text-gray-300 hover:text-gray-500 transition-all hover:rotate-12">
                <HandMetal width={24} height={24} />
            </Link>
        </footer>
    )
}


export default Footer