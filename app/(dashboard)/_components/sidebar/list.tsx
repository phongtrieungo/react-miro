"use client"

import { useOrganizationList } from '@clerk/nextjs'
import OrgListItem from './item';

export default function OrgList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });

  if (!userMemberships.data?.length) {
    return null;
  }
  return (
    <ul className='space-y-4'>
      { 
        userMemberships.data.map((member) => (
          <OrgListItem key={member.organization.id} id={member.organization.id} name={member.organization.name} imageUrl={member.organization.imageUrl} />
        ))
      }
    </ul>
  )
}