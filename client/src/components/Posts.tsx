import React, { useState, useEffect, memo } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient, useMutation } from 'react-apollo-hooks';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Button
} from '@material-ui/core';
const query = gql`
  query Posts {
    posts {
      id
      body
      user {
        id
        name
      }
    }
  }
`;

const removeMutation = gql`
  mutation PostRemove($id: ID) {
    postRemove(id: $id) {
      id
    }
  }
`;

const Posts = () => {
  const { data, loading } = useQuery(query);
  const [checked, setChecked]: [any[], any] = useState([]);
  const removePost = useMutation(removeMutation, {
    update: (cache, { data: { postRemove } }) => {
      const { posts }: any = cache.readQuery({ query });
      const postsRemaining = posts.filter(post => post.id !== postRemove.id);
      cache.writeQuery({ query, data: { posts: postsRemaining } });
    }
  });
  const handleDeleteClick = id => {
    removePost({ variables: { id } });
  };
  const handleRemoveChecked = async () => {
    if (!checked.length) return;
    await Promise.all(checked.map(handleDeleteClick));
    setChecked([]);
  };
  const handleCheckAll = () =>
    setChecked(checked.length === posts.length ? [] : posts.map(p => p.id));

  const handlePostCheckId = post => () =>
    setChecked(
      checked.includes(post.id)
        ? checked.filter(id => id !== post.id)
        : [...checked, post.id]
    );
  if (loading) return <h1> Loading... </h1>;
  const { posts } = data;
  return (
    <div style={{ margin: 10 }}>
      <h2>Posts</h2>
      {!!posts.length && (
        <Button onClick={handleCheckAll}>
          {checked.length === posts.length ? 'Uncheck' : 'Check'} All
        </Button>
      )}
      {!!checked.length && (
        <Button onClick={handleRemoveChecked}>Delete Checked</Button>
      )}
      {posts.map((post, index) => (
        <ExpansionPanel defaultExpanded={!index} key={post.id}>
          <ExpansionPanelSummary
            expandIcon={'??'}
            onClick={handlePostCheckId(post)}
          >
            <Typography
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              # {post.id} - {post.user.name} {checked.includes(post.id) && '?'}
            </Typography>
          </ExpansionPanelSummary>

          <div
            style={{
              padding: 10,
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <Button color="secondary" onClick={() => handleDeleteClick(post.id)}>
            Delete
          </Button>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default memo(Posts);
