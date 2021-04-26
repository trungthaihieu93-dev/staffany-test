import React from 'react';

import Container from 'components/Container';

function withLayout({ title }) {
  return (Component) => (props) => {
    return (
      <Container
        title={title}
      >
        <Component {...props} />
      </Container>
    );
  };
}

export default withLayout;
