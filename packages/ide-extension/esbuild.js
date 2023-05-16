const { join } = require('path');
const { copy } = require('esbuild-plugin-copy');

const buildConfig = {
    logLevel: 'info',
    outfile: 'dist/extension-min.js',
    entryPoints: [join(process.cwd(), 'src/extension.ts')],
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
    platform: 'node',
    target: 'node16.1',
    external: [
        'vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    ],
    plugins: [
        copy({
            // Workaround to copy over the webapp dist files since vsce currently doesn't support pnpm (https://github.com/microsoft/vscode-vsce/issues/421)
            assets: {
                from: ['../webapp/dist/knowledgeHub.js', '../webapp/dist/knowledgeHub.css'],
                to: ['.']
            }
        })
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
