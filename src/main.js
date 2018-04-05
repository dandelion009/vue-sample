import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import Vuex from 'vuex'
Vue.use(Vuex)

import 'vue-material/dist/vue-material.css'
import VueMaterial from 'vue-material'
Vue.use( VueMaterial )

import JsonVueEr from "json-vue-er/JsonVueEr"

let
Detail = {
	components: { JsonVueEr }
,	template: `<json-vue-er :json="$store.state.json.rows[ $route.params.idx ]"></json-vue-er>`
}

let
Home = {
	components: { JsonVueEr }
,	template: `<json-vue-er :json="$store.state.json"></json-vue-er>`
}

new Vue({
	el: '#app'
,	store: new Vuex.Store({
		state: { json: { rows: [] } }
	,	mutations: {
			json: ( state, payload ) => state.json = payload.json
		}
	})
,	router: new Router({
		routes:
		[ { path: '/detail/:idx', component: Detail }
		, { path: '/', component: Home }
		]
	})
,	created() {
		fetch( 'http://192.168.8.197:3000/api/test_mongo_collection?apiKey=ifna212ASFisfsjaAFFF' ).then(
			p => p.json()
		).then(
			p => this.$store.commit( 'json', { json: p } )
		).catch(
			err => alert( err )
		)
	}
,	template: `
		<div>
			<md-toolbar>
				<md-button class="md-icon-button" @click.native="$refs.sideNav.open()">
					<md-icon>menu</md-icon>
				</md-button>
				<h2 class="md-title" style="flex: 1">Default</h2>
				<md-button class="md-icon-button">
					<md-icon>favorite</md-icon>
				</md-button>
			</md-toolbar>
			<md-sidenav class="md-left" ref="sideNav">
				<md-list>
					<md-list-item v-for="( w, i ) in $store.state.json.rows" :key="i">
						<router-link :to="'/detail/' + i" @click.native="$refs.sideNav.close()">{{ i + ':' +  w.name }}</router-link>
					</md-list-item>
				</md-list>
			</md-sidenav>
			<router-view/>
		</div>
	`
})

