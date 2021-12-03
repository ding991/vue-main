// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const path = require('path')
// const webpack = require('webpack')
const { name } = require('./package.json')
const theme = require('./config/theme')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 选项...
    publicPath: process.env.NODE_ENV === 'production' ? `/${name}/` : '/',
    chainWebpack: config => {
        config.resolve.alias.set('@$', resolve('src'))
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: theme,
                javascriptEnabled: true,
            },
        },
    },
}
