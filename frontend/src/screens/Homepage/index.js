import React from 'react';

import withLayout from 'HOCs/withLayout';

import './styles.css';

function Homepage() {
  return (
    <div>
      Homepage
    </div>
  );
}

export default withLayout({ title: 'Homepage' })(Homepage);