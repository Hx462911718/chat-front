
// ref: https://umijs.org/config/
import {resolve} from "path";

export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'chat-front',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  cssLoaderOptions:{
    localIdentName:'[local]'
  },
  chainWebpack(config, { webpack }) {
    config
      .plugin('env')
      .use(require.resolve('webpack/lib/ProvidePlugin'), [{
        $:"jquery",
        jQuery:"jquery",
        "window.jQuery":"jquery",
        "window.$":"jquery",
      }])
  },
  alias: {
    utils: resolve(__dirname,"./src/utils"),
    services: resolve(__dirname,"./src/services"),
    components: resolve(__dirname,"./src/components"),
    assets:resolve(__dirname,"./src/assets"),
    styles:resolve(__dirname,"./src/style")
  },
  proxy: {
    "/webchatMgr/**": {
      "target": "http://localhost:8080",
      "changeOrigin": true,
    },
  },
}
