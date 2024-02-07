"use client"

import { UserButton } from "@clerk/nextjs"

export default function Navbar() {
	return (
		<section className="flex items-center gap-x-4 p-5">
			<section className="hidden lg:flex lg:flex-1">
				{/* Search component */}
			</section>
			<UserButton />
		</section>
	)	
}