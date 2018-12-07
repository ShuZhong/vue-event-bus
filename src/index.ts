import Vue, { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
    export interface Vue {
        $busOn(evTag: string | string[], evFunc: Function): void
        $busOnce(evTag: string | string[], evFunc: Function): void
        $busOff(evTag: string | string[], evFunc?: Function): void
        $busFire(evTag: string | string[], ...args: any[]): void
    }
}

type VueEventBusOptions = {
    events?: string[]
    strict?: boolean
}

type EventStoreProp = {
    [evTag: string]: {
        evFunc: Function
        once: boolean
        self: Vue /* store this for busFire */
    }[]
}

type CompEventStoreProp = {
    [uid: number]: {
        [evTag: string]: Function[]
    }
}

function VueEventBus(Vue: VueConstructor, { events = [], strict = false }: VueEventBusOptions) {

    let version = Number((Vue as any).version.split('.')[0])
    if(version < 2) {
        throw new Error('[vue-event-bus] only support vue 2+ ')
        return
    }

    let eventStore: EventStoreProp = {}
    // Store event use vue._uid -> evTag -> evFunc[], for auto busOff before destory
    let compEventStore: CompEventStoreProp = {}

    let validateEvent = function(evTags: string[]) {
        // when strict = false, stop check
        if(!strict) { return }

        for(let evTag of evTags) {
            if(events.indexOf(evTag) === -1) {
                throw new Error(`Wrong event ${evTag} in strict mode`)
            }
        }
    }

    let busAdd = function(this: Vue, evTags: string | string[], evFunc: Function, once = false) {
        if(typeof evTags === 'string') { evTags = [evTags] }
        validateEvent(evTags)

        let uid: number = (this as any)._uid
        if(!compEventStore[uid]) { compEventStore[uid] = {} }

        for(let evTag of evTags) {
            if(!eventStore[evTag]) { eventStore[evTag] = [] }
            if(!compEventStore[uid][evTag]) { compEventStore[uid][evTag] = [] }

            eventStore[evTag].push({ evFunc, once, self: this })
            compEventStore[uid][evTag].push(evFunc)
        }
    }

    let busOn = function(this: Vue, evTags: string | string[], evFunc: Function) {
        busAdd.call(this, evTags, evFunc, false)
    }

    let busOnce = function(this: Vue, evTags: string | string[], evFunc: Function) {
        busAdd.call(this, evTags, evFunc, true)
    }

    let busOff = function(evTags: string | string[], evFunc?: Function) {
        if(typeof evTags === 'string') { evTags = [evTags] }
        validateEvent(evTags)

        for(let evTag of evTags) {
            if(!eventStore[evTag] || !evFunc) {
                eventStore[evTag] = []
                continue
            }

            eventStore[evTag] = eventStore[evTag].filter(evPart => evPart.evFunc !== evFunc)
        }
    }

    let busFire = function(evTags: string | string[], ...args: any[]) {
        if(typeof evTags === 'string') { evTags = [evTags] }
        validateEvent(evTags)

        for(let evTag of evTags) {
            if(!eventStore[evTag]) { continue }

            let tempQueue = []
            for(let evPart of eventStore[evTag]) {
                if(!evPart.once) { tempQueue.push(evPart) }

                !!evPart.evFunc && evPart.evFunc.apply(evPart.self, args)
            }

            eventStore[evTag] = tempQueue
        }
    }

    Vue.mixin({
        methods: {
            $busOn: busOn,
            $busOnce: busOnce,
            $busOff: busOff,
            $busFire: busFire
        },

        beforeDestroy() {
            let uid: number = (this as any)._uid
            if(!compEventStore[uid]) { return }

            for(let evTag in compEventStore[uid]) {
                for(let evFunc of compEventStore[uid][evTag]) {
                    busOff(evTag, evFunc)
                }
            }

            compEventStore[uid] = {}
        }
    })
}

/* if(typeof window !== 'undefined' && !!(window as any).Vue) {
 *     (window as any).Vue.use(VueEventBus)
 * } */

export default VueEventBus