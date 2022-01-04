module.exports = {
    entry: "./src/index.js",
    output: {
      filename: "index.js",
      libraryTarget: 'commonjs2' //This one the most important line, others things will remain same
    },
    module: {
      //Other code
    }
  };