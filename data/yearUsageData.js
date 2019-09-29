export default (rows, deviceData) => {
  return rows.reduce((acc, row) => {
    let year = row.shift();
    let totalRate = row.shift();
    let result = row.map((rate, rateIndex) => ({
      year,
      device_id: deviceData[rateIndex].device_id,
      rate: rate === "-" ? null : rate
    }));
    return [...acc, ...result];
  }, []);
};
