module.exports = {
    // ... other configuration options ...
    resolve: {
      fallback: {
        "os": require.resolve("os-browserify/browser")
      }
    }
  };