import Vue from 'vue'

import RouterDebugOne from './RouterDebugOne'

const RouterDebugTwo = Vue.extend({
    name: 'RouterDebugTwo',
    components: {
        RouterDebugOne
    },

    data() {
        return {
            compTag: 'RouterDebugOne'
        }
    },

    render() {
        let CompTag = this.compTag
        return(
            <CompTag class="yyyyxxxx">
                
            </CompTag>
        )
    }
})

export default RouterDebugTwo