import  { v } from 'convex/values';
import { query } from './_generated/server';
import { getAllOrThrow } from 'convex-helpers/server/relationships';

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query('userFavorites')
        .withIndex(
          'by_user_org', 
          (query) => query
            .eq('userId', identity.subject)
            .eq('orgId', args.orgId)
        )
        .order('desc')
        .collect();
      const ids = favoriteBoards.map((b) => b.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({...board, isFavorite: true }))
    }

    const searchTerm = args.search;

    let boards: any[] = [];

    if (searchTerm) {
      boards = await ctx.db
        .query('boards')
        .withSearchIndex(
          'search_title', 
          (query) => query.search('title', searchTerm).eq('orgId', args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query('boards')
        .withIndex('by_org', (g) => g.eq('orgId', args.orgId))
        .order('desc')
        .collect();
    }


    const boardWithFavoriteRelationship = boards.map((board) => {
      return ctx.db
        .query('userFavorites')
        .withIndex(
          'by_user_board', 
          (query) => query
            .eq('userId', identity.subject)
            .eq('boardId', board._id)
        )
        .unique()
        .then((favorite) => ({ ...board, isFavorite: !!favorite }))
    });

    const boardWithFavorite = await Promise.all(boardWithFavoriteRelationship);
    
    return boardWithFavorite;
  }
})