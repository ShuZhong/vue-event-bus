<template>
    <div>
        111
    </div>
</template>

<script>

import Vue from 'vue'

const CompOne = Vue.extend({
    name: 'CompOne',

    mounted() {
        console.log(this, '1')

        this.$busOn('EVENT_2', function() { console.log(this, '12') })

        this.$busOnce('EVENT_3', () => { console.log(this, '13') })

        this.$busOn('EVENT_4', this.busOnFunc1)

        this.$busOn(['EVENT_1', 'EVENT_3'], (...args) => {
            console.log(this, args)
        })
    },

    beforeDestroy() {
        console.log(this, 'destory')
    },

    data() {
        return {}
    },

    methods: {
        busOnFunc1() { console.log(this, '14') }
    }
})

export default CompOne

</script>

<style>

.pad {
    padding: 15px 0px 5px 0px;
}

</style>