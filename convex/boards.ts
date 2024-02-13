import  { v } from 'convex/values';
import { query } from './_generated/server';

export const get = query({
  args: {
    orgId: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const boards = await ctx.db
      .query('boards')
      .withIndex('by_org', (g) => g.eq('orgId', args.orgId))
      .order('desc')
      .collect();

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