import React from 'react';

export default function Error({ error }) {
  return (
    <h2 style={{ color: 'red' }}>{error}</h2>
  )
}