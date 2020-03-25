import { useSelector } from 'react-redux';
import { getActiveMetrics, getMetricNames } from '../selectors';
import { useMemo } from 'react';

// I normally would put this in a util area but I want it here so the reviewer can quickly see what I am doing.
// This assumes that it is passed two string arrays, but could be abstracted to take a lot of things with a
// custom comparison function argument.
const removeDuplicatesBetweenArray = (firstArr: string[], secondArr: string[]) => {
  // Assume the longest array is all of the available options. Could limit to first argument.
  const [longArr, shortArr] = firstArr.length > secondArr.length ? [firstArr, secondArr] : [secondArr, firstArr];
  const optionsSet = new Set(longArr);

  shortArr.forEach((str: string) => {
    // If this exists, remove it from the option set.
    // Assumes no duplicates in shortArr
    if (optionsSet.has(str)) optionsSet.delete(str);
  });

  return Array.from(optionsSet);
};

// I could use a create selector to handle this logic for me.
// I wanted to display that I do understand hooks, though.
// So we are going to have a useMetricOptions hook to find what options are available :)
const useMetricOptions = () => {
  const activeMetrics = useSelector(getActiveMetrics);
  const allMetrics = useSelector(getMetricNames);

  const availableOptions = useMemo(() => {
    return removeDuplicatesBetweenArray(allMetrics, activeMetrics);
  }, [allMetrics, activeMetrics]);

  return {
    availableOptions,
    allOptions: allMetrics,
  };
};

export default useMetricOptions;
