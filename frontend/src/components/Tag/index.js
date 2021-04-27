import React from 'react';

import './styles.css';

export default function Tag(props) {
  const {
    containerStyle, Icon,
    text,
  } = props;

  return (
    <div
      style={containerStyle}
      className="tagContainer"
    >
      <Icon />
      <span
        style={{ marginLeft: '10px', textTransform: 'capitalize' }}
      >
        {text}
      </span>
    </div>
  );
}