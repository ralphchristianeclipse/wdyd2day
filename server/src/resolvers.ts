import pubsub from './pubsub';

const resolvers = {
  Post: {
    user: ({ id }) => ({
      id: 1,
      name: 'Ralph',
      email: 'ralph.eclipse@quantrics.com'
    })
  },
  Query: {
    posts: async (_root, _args, { models }) => models.post.all()
  },
  Mutation: {
    postCreate: async (_root, { data }, { models }) => models.post.create(data),
    postUpdate: async (_root, { id, data }, { models }) =>
      models.post.update(data),
    postRemove: async (_root, { id }, { models }) => models.post.remove(id)
  },
  Subscription: {
    post: {
      subscribe: () =>
        pubsub.asyncIterator(['POST_CREATED', 'POST_UPDATED', 'POST_REMOVED'])
    }
  }
};

export default resolvers;
