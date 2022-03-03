const path = require('path');
const { merge } = require('lodash');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, './styles/mixins'),
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   if (isServer) {
  //     const entry = config.entry;
  //
  //     config.entry = () => {
  //       return entry().then((entry) => {
  //         return Object.assign({}, entry, { 'collection.worker': path.resolve(process.cwd(), 'workers/collection.worker.js') })
  //       })
  //     }
  //   }
  //
  //
  //   return config;
  // }
};
