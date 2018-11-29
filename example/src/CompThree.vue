<template>
    <div @click.stop="busFireFunc">
        333
    </div>
</template>

<script>

import Vue from 'vue'

const CompThree = Vue.extend({
    name: 'CompThree',

    mounted() {
        console.log(this, '3')
    },

    data() {
        return {}
    },

    methods: {
        busFireFunc() {
            this.$busFire(['EVENT_1', 'EVENT_2', 'EVENT_3', 'EVENT_4'])
        }
    }
})

export default CompThree

</script>

<style>

.pad {
    padding: 15px 0px 5px 0px;
}

</style>