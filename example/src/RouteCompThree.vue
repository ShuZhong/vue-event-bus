<template>
    <div style="padding-top: 20px">
        This for test:
        <textarea class="xmlArea">
            <Route component="RouteCompThree" />
        </textarea>
    </div>
</template>

<script>

import Vue from 'vue'

const RouteCompThree = Vue.extend({
    name: 'RouteCompThree',
    /*     mounted() { console.log(this.$attrs, this.match, this.location) }, */

    props: {
        match: { type: Object, default: () => ({}) },
        location: { type: Object, default: () => ({}) }
    }
})

export default RouteCompThree

</script>

<style scoped>

.xmlArea {
    width: 100%;
    height: 30px;
    border: none;
}

</style>
