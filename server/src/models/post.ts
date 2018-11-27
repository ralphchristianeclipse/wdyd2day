import { request } from '../request';

const model = {
  create: data =>
    request({
      method: 'post',
      url: '/posts',
      data
    }),
  update: (id, data) =>
    request({
      method: 'post',
      url: `/posts/${id}`,
      data
    }),
  remove: id =>
    request({
      method: 'delete',
      url: `/posts/${id}`
    }),
  all: () =>
    request({
      url: '/posts'
    })
};

export default model;
