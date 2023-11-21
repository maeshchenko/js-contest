import path from 'path';
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

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
