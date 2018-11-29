<template>
    <div>
        <Link :to="linkOne"> linkOne  </Link>
        <Link to="/link-one/"> linkOne With strict(slash)  </Link>
        <Link to="/link-one/id1"> linkOne2 </Link>

        <Route path="/link-one" exact>
            exact = true; param = false
        </Route>

        <Route path="/link-one/" strict>
            exact = false; strict = true, param = false
        </Route>

        <Route path="/link-one/" strict exact>
            exact = true; strict = true, param = false
        </Route>

        <Route path="/link-one">
            exact = false; param = false
        </Route>

        <Route path="/link-one/:id">
            exact = false; param = true
        </Route>

        <Route path="/link-one/:id" exact>
            exact = true; param = true
        </Route>
    </div>
</template>

<script>

import Vue from 'vue'
import { Link, Route } from 'vue-another-router'

const RouterDebugOne = Vue.extend({
    name: 'RouterDebugOne',
    components: {
        Link,
        Route
    },

    data() {
        return {
            linkOne: {
                pathname: '/link-one'
            }
        }
    },

    props: {

    }
})

export default RouterDebugOne

</script>

<style scoped>

</style>
