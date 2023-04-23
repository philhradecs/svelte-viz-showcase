import dotPlotData from '../../../assets/datasets/us-distribution-state-age.json';

export const getDotPlotData = () => {
  const ageCategories = [...new Set(dotPlotData.map(({ ageCategory }) => ageCategory))];

  return {dotPlotData, ageCategories}
}