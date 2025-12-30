import path from 'path';

export default {
  webpack: {
    alias: {},
    configure: (webpackConfig: unknown) => {
      // Custom Webpack changes can be made here
      return webpackConfig;
    },
  },
};
