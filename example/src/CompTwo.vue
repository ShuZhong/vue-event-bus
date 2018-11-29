<template>
    <div id="test">
        222
    </div>
</template>

<script>

import Vue from 'vue'

const CompTwo = Vue.extend({
    name: 'CompTwo',

    mounted() {
        console.log(this, '2')

        setTimeout(() => {
            this.$busFire(['EVENT_1', 'EVENT_2', 'EVENT_3', 'EVENT_4'])
        }, 1000)
    },

    data() {
        return {}
    }
})

export default CompTwo

</script>

<style>

.pad {
    padding: 15px 0px 5px 0px;
}

</style>