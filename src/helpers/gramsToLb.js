const getWeightInLb = (weightInGrams) => {
  const weightInLb = weightInGrams * 0.00220462;
  return weightInLb;
};

export default { getWeightInLb };
