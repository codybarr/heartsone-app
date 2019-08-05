<template>
	<div class="decks row">
		<div class="col-md-3 order-2">
			<ul class="nav nav-pills flex-column card card-body">
				<li class="nav-item">
					<router-link
						:to="{ name: 'publicDecks' }"
						class="nav-link"
						activeClass="active"
						exact
					>
						Public Decks
					</router-link>
				</li>
				<li class="nav-item">
					<router-link
						:to="{ name: 'myDecks' }"
						class="nav-link"
						activeClass="active"
						exact
					>
						My Decks
					</router-link>
				</li>
			</ul>
		</div>
		<div class="col-md-9 order-1">
			<router-view></router-view>
		</div>
	</div>
</template>
