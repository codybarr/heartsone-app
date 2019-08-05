<template>
	<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
		<router-link to="/" class="navbar-brand">{{ title }}</router-link>

		<button
			class="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarCollapse"
			aria-controls="navbarCollapse"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarCollapse">
			<ul class="navbar-nav mr-auto">
				<router-link
					tag="li"
					to="/"
					class="nav-item"
					activeClass="active"
					exact
				>
					<a class="nav-link">Search</a>
				</router-link>
				<router-link tag="li" to="/decks" class="nav-item" activeClass="active">
					<a class="nav-link">Decks</a>
				</router-link>
			</ul>
			<div class="mr-sm-2">
				<Loader v-if="loadingUser" />
				<div v-else>
					<div v-if="loggedIn">
						<ul class="navbar-nav">
							<li class="nav-item dropdown">
								<a
									class="nav-link dropdown-toggle"
									href="#"
									id="userDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<span class="navbar-text p-2">{{ user.email }}</span>
									<img :src="user.photoURL" class="avatar" />
								</a>
								<div
									class="dropdown-menu dropdown-menu-right"
									aria-labelledby="userDropdown"
								>
									<router-link :to="{ name: 'myDecks' }" class="dropdown-item">
										My Decks
									</router-link>
									<div class="dropdown-divider"></div>
									<a @click.prevent="logout" class="dropdown-item" href="#"
										>Logout</a
									>
								</div>
							</li>
						</ul>
						<!-- <button @click.prevent="logout"
                            class="btn btn-primary my-2 my-sm-0"
                            type="submit">Logout</button> -->
					</div>
					<button
						v-else
						@click.prevent="login"
						class="btn btn-primary my-2 my-sm-0"
						type="submit"
					>
						Login
					</button>
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
		...mapGetters(['user', 'loggedIn', 'loadingUser'])
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
#app {
	padding-top: 70px; // for fixed nav
}

.avatar {
	vertical-align: middle;
	width: 25px;
	height: 25px;
	border-radius: 50%;
}

#userDropdown {
	padding: 0;
}
</style>
