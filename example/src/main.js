import Vue from 'vue'
import VueEventBus2 from 'vue-event-bus2'

import MainApp from './MainApp'

const validEvents = ['EVENT_1', 'EVENT_2', 'EVENT_3', 'EVENT_4', 'EVENT_5']

Vue.use(VueEventBus2, {
    events: validEvents, /* declare  available event */
    strict: true
})

new MainApp({
    el: '#MainApp'
})
