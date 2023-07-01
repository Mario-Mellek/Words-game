import React from 'react';
import { Circle } from 'rc-progress';
import PropTypes from 'prop-types';


const Score = ({ percentage, score }) => {
  return (
    <div>
      <Circle
        className='score-Circle'
        percent={percentage || score}
        strokeWidth={3}
        strokeColor="#000000"
        trailWidth={2}
      />
    </div>
  );
};
Score.propTypes = {
  percentage: PropTypes.number.isRequired,
  score: PropTypes.number
};
export default Score;
