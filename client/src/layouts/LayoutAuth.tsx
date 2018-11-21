import React, { useState } from 'react';

const LayoutAuth = () => {
  const [auth, setAuth] = useState('auth');

  return <div>{auth}</div>;
};
