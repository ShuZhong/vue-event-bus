import { VueConstructor } from 'vue';
declare module 'vue/types/vue' {
    interface Vue {
        $busOn(evTag: string | string[], evFunc: Function): void;
        $busOnce(evTag: string | string[], evFunc: Function): void;
        $busOff(evTag: string | string[], evFunc?: Function): void;
        $busFire(evTag: string | string[], ...args: any[]): void;
    }
}
declare type VueEventBusOptions = {
    events?: string[];
    strict?: boolean;
};
declare function VueEventBus(Vue: VueConstructor, { events, strict }?: VueEventBusOptions): void;
export default VueEventBus;
