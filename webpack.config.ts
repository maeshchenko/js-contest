import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import {Configuration} from 'webpack-dev-server';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

export type TBuildMode = 'production' | 'development';

export interface IBuildEnv {
    mode: TBuildMode;
    port: number;
}

export default (env:IBuildEnv): webpack.Configuration => {
    const isDev = env.mode === 'development';
    const PORT = env.port ?? 3000;
    const config = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: !isDev ? undefined : {
            port: PORT,
            open: true,
            hot: true,
            historyApiFallback: true
        } as Configuration,
        output: {
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],

        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            preferAbsolute: true,
            modules: [path.resolve(__dirname, 'src'), "node_modules"],
            mainFiles: ["index"],
            alias: {},
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/[id].[contenthash].css',
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin(
                    {
                        extractComments: false
                    }
                )
            ]
        }
    }

    return config;
};
