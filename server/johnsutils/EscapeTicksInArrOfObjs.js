const transformArrOfObjs = (arr, transform) => {
    return arr.map(obj => {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = transform(obj[key].toString());
        return acc;
      }, {});
    });
};

const encode = (arr) => {
  return transformArrOfObjs(
    arr,
    (val) => val.replace(/'/g, "''")
  );
};

const decode = (arr) => {
  return transformArrOfObjs(
    arr,
    (val) => val.replace(/''/g, "'")
  );
};

module.exports = {
  encode,
  decode
}
