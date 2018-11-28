import { VueConstructor } from 'vue'

type VueEventBus2Options = {
    events?: string[]
    strict?: boolean
}

type EventQueueProp = {
    [key: string]: {
        evFunc: Function
        once: boolean
    }[]
}

function showMessageError(evTag: string) {
    if(process.env.NODE_ENV !== 'production') {
        throw new Error(`Wrong event ${evTag} in strict mode`)
    } else {
        console.log(`Wrong event ${evTag} in strict mode`)
    }
}

function VueEventBus2(Vue: VueConstructor<any>, { events = [], strict = false }: VueEventBus2Options) {

    let eventStore: EventQueueProp = {}

    let checkEvent = function(evTags: string[]) {
        if(!strict) { return }

        for(let evTag of evTags) {
            if(events.indexOf(evTag) === -1) { showMessageError(evTag) }
        }
    }

    let busOn = function(evTags: string | string[], evFunc: Function) {
        if(typeof evTags === 'string') { evTags = [evTags] }

        checkEvent(evTags)

        for(let evTag of evTags) {
            if(!eventStore[evTag]) { eventStore[evTag] = [] }

            eventStore[evTag].push({ evFunc, once: false })
        }
    }

    let busOnce = function(evTags: string | string[], evFunc: Function) {
        if(typeof evTags === 'string') { evTags = [evTags] }

        checkEvent(evTags)

        for(let evTag of evTags) {
            if(!eventStore[evTag]) { eventStore[evTag] = [] }

            eventStore[evTag].push({ evFunc, once: true })
        }
    }

    let busOff = function(evTags: string | string[], evFunc?: Function) {
        if(typeof evTags === 'string') { evTags = [evTags] }

        checkEvent(evTags)

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

        for(let evTag of evTags) {
            if(!eventStore[evTag]) { continue }

            checkEvent(evTags)

            let tempQueue = []
            for(let evPart of eventStore[evTag]) {
                if(!evPart.once) { tempQueue.push(evPart) }

                !!evPart.evFunc && evPart.evFunc.apply(this, args)
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
        }
    })
}

if(typeof window !== 'undefined' && !!(window as any).Vue) {
    (window as any).Vue.use(VueEventBus2)
}

export default VueEventBus2