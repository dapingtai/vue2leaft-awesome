import Vue from 'vue';
import Router from 'vue-router';
import HelloMap from '@/components/HelloMap.vue';
import demo from "@/components/Demo";
import CoreTest from "@/components/untils/CoreTest";

export let routerModuels = { HelloMap, ...demo, CoreTest };

Vue.use(Router);

// 建立Vue 路由分頁
export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloMap',
            component: routerModuels.HelloMap
        },
        {
            path: '/Start',
            name: 'Start',
            component: routerModuels.Start
        },
        {
            path: '/FullScreen',
            name: 'FullScreen',
            component: routerModuels.FullScreen
        },
        {
            path: '/Draggable',
            name: 'Draggable',
            component: routerModuels.Draggable
        },
        {
            path: '/CoreTest',
            name: 'CoreTest',
            component: routerModuels.CoreTest
        },
        {
            path: '/Control',
            name: 'Control',
            component: routerModuels.Control
        },
        {
            path: '/Attribution',
            name: 'Attribution',
            component: routerModuels.Attribution
        },
        {
            path: '/Analysis',
            name: 'Analysis',
            component: routerModuels.Analysis
        },
        {
            path: '/Draw',
            name: 'Draw',
            component: routerModuels.Draw
        },

    ]
})
