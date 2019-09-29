const uuidv4 = require("uuid/v4");

export default columns => {
  return columns
    .map((column, index) => {
      if (index !== 0 && index !== 1) {
        return {
          device_name: column,
          device_id: uuidv4()
        };
      }
    })
    .filter(result => result);
};
