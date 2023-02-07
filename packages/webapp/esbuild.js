const { join } = require('path');
const { sassPlugin } = require('esbuild-sass-plugin');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const svgrPlugin = require('esbuild-plugin-svgr');

const buildConfig = {
    logLevel: 'info',
    outdir: 'dist',
    entryPoints: {
        index: join(process.cwd(), 'src/index.ts'),
        knowledgeHub: join(process.cwd(), 'src/webview/index.tsx')
    },
    write: true,
    format: 'cjs',
    bundle: true,
    metafile: true,
    mainFields: ['module', 'main'], // https://stackoverflow.com/a/69352281
    minify: true,
    loader: {
        '.jpg': 'file',
        '.gif': 'file',
        '.mp4': 'file',
        '.graphql': 'text',
        '.png': 'file',
        '.svg': 'file'
    },
    platform: 'browser',
    target: 'chrome90',
    external: [
        'vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals
    ],
    plugins: [
        sassPlugin({
            async transform(source) {
                const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
                return css;
            }
        }),
        cssModulesPlugin(),
        svgrPlugin()
    ]
};

if (process.argv.slice(2).includes('--watch')) {
    buildConfig.watch = true;
    buildConfig.sourcemap = 'inline';
}

require('esbuild')
    .build(buildConfig)
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
