<template>
    <div @click.stop="isUsable = false">
        000
        <template v-if="isUsable">
            <CompOne/>
            <CompTwo/>
        </template>

        <CompThree/>
        000
    </div>
</template>

<script>

import Vue from 'vue'

import CompOne from './CompOne'
import CompTwo from './CompTwo'
import CompThree from './CompThree'

const MainApp = Vue.extend({
    name: 'MainApp',
    components: {
        CompOne,
        CompTwo,
        CompThree
    },

    data() {
        return {
            isUsable: true
        }
    }
})

export default MainApp

</script>

<style>

.pad {
    padding: 15px 0px 5px 0px;
}

</style>