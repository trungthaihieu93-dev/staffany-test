import React from 'react';
import { useParams } from 'react-router-dom';

import './styles.css';

export default function ShiftReview() {
  const { id } = useParams();

  return (
    <div>
      {id}
    </div>
  );
}