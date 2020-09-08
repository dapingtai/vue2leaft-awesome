import Vue from 'vue';
import Router from 'vue-router';
import HelloMap from '@/components/HelloMap.vue';
import Start from "@/components/Demo/Start";
import FullScreen from "@/components/Demo/FullScreen";
import CoreTest from "@/components/untils/CoreTest";
import {TopLeftButton, TopRightButton} from "@/components/Demo/Control";
import { BottomRightButton } from "@/components/Demo/Control";
Vue.use(Router);

// 建立Vue 路由分頁

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloMap',
            component: HelloMap
        },
        {
            path: '/Start',
            name: 'Start',
            component: Start
        },
        {
            path: '/FullScreen',
            name: 'FullScreen',
            component: FullScreen
        },
        {
            path: '/CoreTest',
            name: 'CoreTest',
            component: CoreTest
        },
        {
            path: '/TopLeftButton',
            name: 'TopLeftButton',
            component: TopLeftButton
        },
        {
            path: '/TopRightButton',
            name: 'TopRightButton',
            component: TopRightButton
        },
        {
            path: '/BottomRightButton',
            name: 'BottomRightButton',
            component: BottomRightButton
        }
    ]
})
