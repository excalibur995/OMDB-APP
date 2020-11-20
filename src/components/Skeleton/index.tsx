import React from 'react';
import './index.scss';
interface SkeletonProps {
  width: number;
  height: number;
}

export default function Skeleton(props: SkeletonProps) {
  const numberToString = (num: number) => {
    return String(num) + 'px';
  };

  const skeletonDimension = () => {
    return {
      height: numberToString(props.height),
      width: numberToString(props.width),
      margin: '0 auto',
    };
  };

  return (
    <div className="skeleton" style={skeletonDimension()}>
      <div className="skeleton-animation" style={skeletonDimension()} />
    </div>
  );
}

Skeleton.defaultProps = {
  height: 96,
  width: 16,
};
