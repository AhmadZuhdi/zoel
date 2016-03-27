module.exports = {
  start: function () {
    return new Promise((resolve) => {
      setTimeout(resolve('ahay'), 1000);
    });
  },
};
