<template>
    <div style="padding-top: 20px">
        This for test:
        <textarea class="xmlArea">
            <Route tag="div">

            </Route>
        </textarea>
    </div>
</template>

<script>

import Vue from 'vue'

const RouteCompFour = Vue.extend({
    name: 'RouteCompFour',
    mounted() { console.log(this.$attrs, this.match, this.location) },

    props: {
        match: { type: Object, default: () => ({}) },
        location: { type: Object, default: () => ({}) }
    }
})

export default RouteCompFour

</script>

<style scoped>

.xmlArea {
    width: 100%;
    height: 100px;
    border: none;
}

</style>
