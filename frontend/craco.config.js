// Load configuration from environment or config file
const path = require('path');

// Environment variable overrides
const config = {
  disableHotReload: process.env.DISABLE_HOT_RELOAD === 'true',
};

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      
      // Production optimizations
      if (process.env.NODE_ENV === 'production') {
        // Disable source maps in production for security and performance
        webpackConfig.devtool = false;
        
        // Optimize bundle splitting
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            maxSize: 244000, // 244KB max chunk size
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                maxSize: 244000,
              },
              common: {
                name: 'common',
                minChunks: 2,
                chunks: 'all',
                enforce: true,
              },
            },
          },
          usedExports: true,
          sideEffects: false,
        };
      }
      
      // Disable hot reload completely if environment variable is set
      if (config.disableHotReload) {
        // Remove hot reload related plugins
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name === 'HotModuleReplacementPlugin');
        });
        
        // Disable watch mode
        webpackConfig.watch = false;
        webpackConfig.watchOptions = {
          ignored: /.*/, // Ignore all files
        };
      } else {
        // Add ignored patterns to reduce watched directories
        webpackConfig.watchOptions = {
          ...webpackConfig.watchOptions,
          ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/build/**',
            '**/dist/**',
            '**/coverage/**',
            '**/public/**',
          ],
        };
      }
      
      return webpackConfig;
    },
  },
  
  // Development server configuration
  devServer: process.env.NODE_ENV === 'development' ? {
    port: 3000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  } : undefined,
};