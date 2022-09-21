import webpack, { Stats } from 'webpack';

import args from './configs/args';
import developmentWebpackConfig from './configs/webpack.dev';
import productionWebpackConfig from './configs/webpack.prod';

const isProduction = process.env.NODE_ENV !== 'development';
const compiler = webpack(isProduction ? productionWebpackConfig : developmentWebpackConfig);

function handler(error?: Error | null | undefined, stats?: Stats) {
    if (error) {
        console.error(error);
        return;
    }

    const productionStats = {
        preset: 'normal',
        colors: true
    };

    console.log(stats?.toString(isProduction ? productionStats : 'minimal'));
}

if (args.watch) {
    compiler.watch({}, handler);
} else {
    compiler.run(handler);
}
