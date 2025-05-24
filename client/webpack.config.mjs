import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isDevelopment = process.env.NODE_ENV !== 'production'

export default {
    mode: isDevelopment ? 'development' : 'production',
    entry:  path.resolve(__dirname, 'src/app/index.tsx'),
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: true,
                                localIdentName: isDevelopment
                                    ? '[path][name]__[local]--[hash:base64:5]'
                                    : '[hash:base64:8]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env', {}]],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
}