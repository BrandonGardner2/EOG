import React from 'react';
import MetricContainer from '../Features/Metrics/MetricContainer';
import LastUpdateList from '../Features/Metrics/LastUpdate/LastUpdateList';

const Metrics = () => {
  return (
    <MetricContainer>
      <LastUpdateList />
    </MetricContainer>
  );
};

export default Metrics;
