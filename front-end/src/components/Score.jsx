import React from 'react';
import { Circle } from 'rc-progress';
import PropTypes from 'prop-types';


const Score = ({ percentage, score }) => {
  return (
    <div>
      <Circle
        className='score-Circle'
        percent={percentage || score}
        strokeWidth={1}
        strokeColor="#000000"
        trailWidth={0.5}
      />
    </div>
  );
};
Score.propTypes = {
  percentage: PropTypes.number.isRequired,
  score: PropTypes.number
};
export default Score;
