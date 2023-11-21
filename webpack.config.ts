import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import 'webpack-dev-server';

export type TBuildMode = 'production' | 'development';

export interface IBuildEnv {
    mode: TBuildMode;
    port: number;
}

export default (env:IBuildEnv) => {
    const config = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        devtool: 'inline-source-map',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
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
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
            ],

        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            new webpack.ProgressPlugin()
        ],
    }

    return config;
};
