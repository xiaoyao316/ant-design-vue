/* eslint-disable import/no-unresolved */
import Layout from '../layouts/index.vue';
import demoRoutes from './demoRoutes';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // ...otherRoutes,
  {
    path: '/components',
    component: Layout,
    children: [
      {
        path: 'overview:lang(.*)',
        component: () => import('../views/ComponentOverview.vue'),
      },
      ...demoRoutes,
    ],
  },
  {
    path: '/docs',
    component: Layout,
    // props: route => {
    //   const name = route.path.split('/docs/vue/')[1].split('/')[0];
    //   return { name, showApi: true };
    // },
    children: [
      {
        path: 'vue/introduce-cn',
        meta: { enTitle: 'Ant Design of Vue', title: 'Ant Design of Vue', category: 'docs' },
        component: () => import('../vueDocs/introduce.zh-CN.md'),
      },
      {
        path: 'vue/introduce',
        meta: { enTitle: 'Ant Design of Vue', title: 'Ant Design of Vue', category: 'docs' },
        component: () => import('../vueDocs/introduce.en-US.md'),
      },
      {
        path: 'vue/getting-started-cn',
        meta: { enTitle: 'Getting Started', title: '快速上手', category: 'docs' },
        component: () => import('../vueDocs/getting-started.zh-CN.md'),
      },
      {
        path: 'vue/getting-started',
        meta: { enTitle: 'Getting Started', title: '快速上手', category: 'docs' },
        component: () => import('../vueDocs/getting-started.en-US.md'),
      },
      {
        path: 'vue/customize-theme-cn',
        meta: { enTitle: 'Customize Theme', title: '定制主题', category: 'docs' },
        component: () => import('../vueDocs/customize-theme.zh-CN.md'),
      },
      {
        path: 'vue/customize-theme',
        meta: { enTitle: 'Customize Theme', title: '定制主题', category: 'docs' },
        component: () => import('../vueDocs/customize-theme.en-US.md'),
      },

      {
        path: 'vue/customize-theme-variable-cn',
        meta: { enTitle: 'Dynamic Theme (Experimental)', title: '动态主题', category: 'docs' },
        component: () => import('../vueDocs/customize-theme-variable.zh-CN.md'),
      },
      {
        path: 'vue/customize-theme-variable',
        meta: { enTitle: 'Dynamic Theme (Experimental)', title: '动态主题', category: 'docs' },
        component: () => import('../vueDocs/customize-theme-variable.en-US.md'),
      },
      { path: '', redirect: '/docs/vue/introduce/' },
    ],
  },
  { path: '/:lang(.*)', redirect: '/components/overview' },
];

export default createRouter({
  history: createWebHistory(),
  fallback: false,
  routes,
  scrollBehavior: to => {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: 'auto' };
    }
  },
});
