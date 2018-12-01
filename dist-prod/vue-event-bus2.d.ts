import { VueConstructor } from 'vue'

declare type VueEventBus2Options = {
    events?: string[]
    strict?: boolean
}

declare function VueEventBus2(Vue: VueConstructor, { events, strict }: VueEventBus2Options): void

declare module 'vue/types/vue' {
    export interface Vue {
        $busOn(evTag: string | string[], evFunc: Function)
        $busOnce(evTag: string | string[], evFunc: Function)
        $busOff(evTag: string | string[], evFunc?: Function)
        $busFire(evTag: string | string[], ...args: any[])
    }
}

export default VueEventBus2
