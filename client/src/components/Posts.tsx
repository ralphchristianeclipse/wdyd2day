import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Grid, CardContent, CardHeader, Card } from '@material-ui/core';
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
  if (loading) return <h1> Loading... </h1>;
  const { posts } = data;
  return (
    <Grid container style={{ margin: '10px' }} justify="center">
      {posts.map(post => (
        <Grid key={post.id} item>
          <Card>
            <CardHeader
              title={
                <React.Fragment>
                  <h3>{post.user.name}</h3>
                  <p style={{ color: '#CCC', fontSize: '14px' }}>
                    Id: {post.id}
                  </p>
                </React.Fragment>
              }
            />
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
