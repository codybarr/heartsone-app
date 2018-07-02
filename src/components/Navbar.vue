<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link to="/" class="navbar-brand">{{ title }}</router-link>

        <button class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <!-- <a class="nav-link"
                        href="#">Home <span class="sr-only">(current)</span>
                    </a> -->
                    <router-link to="/" class="nav-link">Search</router-link>
                </li>
                <li class="nav-item">
                    <!-- <a class="nav-link" href="#">Link</a> -->
                    <router-link to="/decks" class="nav-link">Decks</router-link>
                </li>
                <!--             <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li> -->
            </ul>
            <div class="mr-sm-2">
                <Loader v-if="loadingUser"/>
                <div v-else>
                    <div v-if="loggedIn">
                        <img :src="user.photoURL" class="avatar"/>
                        <span class="navbar-text p-2">{{ user.email }}</span>
                        <button @click.prevent="logout"
                            class="btn btn-primary my-2 my-sm-0"
                            type="submit">Logout</button>
                    </div>
                    <button v-else
                        @click.prevent="login"
                        class="btn btn-primary my-2 my-sm-0"
                        type="submit">Login</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { LOGIN, LOGOUT } from '@/store/actions.type'

import Loader from '@/components/Loader.vue'

export default {
    components: {
        Loader
    },
    props: ['title'],
    computed: {
        ...mapGetters([
            'user',
            'loggedIn',
            'loadingUser'
        ])
    },
    methods: {
        login() {
            store.dispatch(LOGIN)
        },
        logout() {
            store.dispatch(LOGOUT)
        }
    }
}
</script>

<style lang="scss">
.avatar {
    vertical-align: middle;
    width: 25px;
    height: 25px;
    border-radius: 50%;
}
</style>
