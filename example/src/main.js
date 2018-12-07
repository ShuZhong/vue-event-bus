import Vue from 'vue'
import VueEventBus from '@shuzhong/vue-event-bus'

import MainApp from './MainApp'

const validEvents = ['EVENT_1', 'EVENT_2', 'EVENT_3', 'EVENT_4', 'EVENT_5']

Vue.use(VueEventBus, {
    events: validEvents, /* declare  available event */
    strict: true
})

new MainApp({
    el: '#MainApp'
})
