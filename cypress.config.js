const { defineConfig } = require('cypress');


module.exports = defineConfig({
  e2e: {
    video: false,
    baseUrl: 'http://localhost:6006',
    experimentalStudio: true,
  },
});