const path = require('path')
const { removePlugins, pluginByName } = require('@craco/craco')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'src')
      }

      config.resolve.plugins = config.resolve.plugins || []
      config.resolve.plugins.push(
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, 'tsconfig.json')
        })
      )

      // CRA's fork-ts-checker breaks on TypeScript 5.9+ (performance.mark is read-only).
      // Typechecking stays in `npm run lint` via tsc --noEmit.
      removePlugins(config, pluginByName('ForkTsCheckerWebpackPlugin'))

      return config
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      }
    }
  }
}
