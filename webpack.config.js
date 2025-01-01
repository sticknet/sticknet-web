const {
    sentryWebpackPlugin,
} = require('@sentry/webpack-plugin');

const path = require('path');
const {DefinePlugin} = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: argv.mode,

        context: __dirname,
        watch: true,
        entry: './src/index.tsx',

        output: {
            path: path.resolve(__dirname, '../sticknet-engine/webpack/assets/bundles/'),
            filename: '[name]-[hash].js',
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                'path': require.resolve('path-browserify'),
                'fs': false,
            },
        },

        experiments: {
            asyncWebAssembly: true,
        },

        devServer: {
            contentBase: path.resolve('../sticknet-engine/webpack/assets/bundles/'),
            hot: true,
            port: 8080,
            publicPath: '/',
        },

        plugins: [
            new BundleTracker({filename: '../sticknet-engine/webpack/webpack-stats.json'}),
            new DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(argv.mode),
            }),
            new CleanWebpackPlugin(),
            sentryWebpackPlugin({
                authToken: process.env.SENTRY_AUTH_TOKEN,
                org: 'sticknet',
                project: 'web',
            }),
        ],

        optimization: argv.mode === 'production' ? {
            minimize: true,
            minimizer: [new TerserPlugin()],
        } : {},

        module: {
            noParse: /\.wasm$/,
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.(png|jpg|jpeg|ttf)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name].[ext]',
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    localIdentName: '[name]__[local]___[hash:base64:5]',
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.wasm$/,
                    loader: 'base64-loader',
                    type: 'javascript/auto',
                },
            ],
        },

        devtool: 'source-map',
    };
};
