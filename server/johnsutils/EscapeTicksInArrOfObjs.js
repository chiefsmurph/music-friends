const encodeVal = (val) => val.replace(/'/g, "''");
const decodeVal = (val) => val.replace(/''/g, "'");

const transformObj = (obj, transform) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = transform(obj[key].toString());
    } else {
      console.log('woah watch here: ' + acc[key] + ' and ' + key);
    }
    return acc;
  }, {});
};

const encodeObj = (obj) => {
  return transformObj(
    obj,
    encodeVal
  );
};

const decodeObj = (obj) => {
  return transformObj(
    obj,
    decodeVal
  );
};

module.exports = {
  encodeVal,
  decodeVal,
  encodeObj,
  decodeObj
};
