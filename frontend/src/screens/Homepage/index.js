import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import withLayout from 'HOCs/withLayout';

import './styles.css';

function Homepage() {
  const history = useHistory();
  return (
    <div>
      Home
    </div>
  );
}

export default withLayout({ title: 'Homepage' })(Homepage);