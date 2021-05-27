const parseTimelineString = (timelineString, setError) => {
  try {
    setError('');

    const processData = timelineString.split(',');

    let pattern = [];

    processData.forEach(value => {
      if (value === '' || isNaN(Number(value)) || Number(value) > 49) {
        throw new Error();
      } else {
        pattern.push(Number(value));
      }
    });

    return pattern;
  } catch (err) {
    setError('Invalid rotation pattern!');
  }
};

export default parseTimelineString;
