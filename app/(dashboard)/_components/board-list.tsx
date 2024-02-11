'use client'

import EmptyBoards from "./empty-board";
import EmptyFavorites from "./empty-favorites";
import EmptySearch from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ orgId, query }: BoardListProps) {
  const data = []; // TODO: change to API call
  if (!data?.length && query.search) {
    return (
      <EmptySearch />
    )
  }

  if (!data?.length && query.favorites) {
    return (
      <EmptyFavorites />
    )
  }

  if (!data?.length) {
    return (
      <EmptyBoards />
    )
  }

  return (
    <>{ JSON.stringify(query)}</>
  )
}
