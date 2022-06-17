/* eslint-disable @typescript-eslint/no-var-requires */
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { ESLint } = require('eslint');

(async () => {
  /**
   * 找到所有的组件文档入口
   * */
  const paths = await globby('components/*/index.*.md');

  /** 收集所有组件文档的数据
   {
      affix: {
        category: 'Components'
        cover: 'https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg'
        subtitle: '固钉'
        title: 'Affix'
        type: '导航'
      },
      ...
    }
   */
  const components = {};

  paths.forEach(path => {
    const content = fs.readFileSync(path).toString();
    const componentName = path.split('/')[1];

    if (componentName !== 'color-picker') {
      const { data } = matter(content);
      components[componentName] = { ...components[componentName], ...data };
    }
  });

  /**
   * 生成所有组件 demo 对应的路由配置（字符串）
   * 'export default [
   *    {
   *      path: 'affix:lang(-cn)?',
   *        "category": "Components",
   *        "type": "导航",
   *        "title": "Affix",
   *        "cover": "https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg",
   *        "subtitle": "固钉"
   *      },
   *      component: () => import('../../../components/affix/demo/index.vue'),
   *    },
   *    ...
   * ];'
   */
  const TEMPLATE = `
    export default [
      ${Object.keys(components).map(
        component => `
      {
        path: '${component}:lang(-cn)?',
        meta: ${JSON.stringify(components[component])},
        component: () => import('../../../components/${component}/demo/index.vue'),
      }`,
      )}
    ];
  `;

  /**
   * 用 eslint 过一遍再重写 demo 路由配置文件
   */
  const engine = new ESLint({
    fix: true,
    useEslintrc: false,
    baseConfig: require(path.join(process.cwd(), '.eslintrc.js')),
  });

  const report = await engine.lintText(TEMPLATE);

  fs.writeFileSync('site/src/router/demoRoutes.js', report[0].output);
})();
