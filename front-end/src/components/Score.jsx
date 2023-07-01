import React from 'react';
import { Circle } from 'rc-progress';
import PropTypes from 'prop-types';


const Score = ({ percentage }) => {
  return (
    <div>
      <Circle
        className='score-Circle'
        percent={percentage}
        strokeWidth={3}
        strokeColor="#000000"
        trailWidth={2}
      />
    </div>
  );
};
Score.propTypes = {
  percentage: PropTypes.number,
};
export default Score;
