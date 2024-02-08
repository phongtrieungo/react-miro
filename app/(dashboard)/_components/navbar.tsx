"use client"

import { OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs"
import SearchInput from "./search-input"
import InviteButton from "./invite-button";

export default function Navbar() {
  const { organization } = useOrganization();

	return (
		<section className="flex items-center gap-x-4 p-5">
			<section className="hidden lg:flex lg:flex-1">
        <SearchInput />
			</section>
      <section className="block lg:hidden flex-1">
        <OrganizationSwitcher hidePersonal 
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
                maxWidth: '376px'
              },
              organizationSwitcherTrigger: {
                padding: '6px',
                width: '100%',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                justifyContent: 'space-between',
                backgroundColor: 'white'
              }
            }
          }} />
      </section>
      { organization && (<InviteButton />)}
			<UserButton />
		</section>
	);
}