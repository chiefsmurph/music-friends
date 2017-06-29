const transformArrOfObjs = (arr, transform) => {
    return arr.map(obj => {
      return Object.keys(obj).reduce((acc, key) => {
        if (obj[key]) {
          acc[key] = transform(obj[key].toString());
        } else {
          console.log('woah watch here: ' + acc[key] + ' and ' + key);
        }
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
