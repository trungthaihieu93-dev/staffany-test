import React from 'react';

import styles from './styles.css';

export default function Container({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  )
}