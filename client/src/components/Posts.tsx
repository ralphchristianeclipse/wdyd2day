import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import {
  Grid,
  CardContent,
  CardHeader,
  Card,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
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

const Posts = () => {
  const { data, loading } = useQuery(query);
  // const [test] = useWatchQuery({ query });
  // console.log(test);
  if (loading) return <h1> Loading... </h1>;
  const { posts } = data;
  return (
    <div>
      {posts.map(post => (
        <ExpansionPanel key={post.id}>
          <ExpansionPanelSummary expandIcon={'🙏'}>
            <Typography
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              # {post.id} - {post.user.name}
            </Typography>
          </ExpansionPanelSummary>
          <Typography>
            <p
              style={{
                padding: 10,
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </Typography>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default Posts;
