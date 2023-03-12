import { createApp } from 'vue'
import './less/global.less'
import { state, dispatch } from './store/store'
import App from './App.vue'

createApp(App).provide('store', {state, dispatch}).mount('#app')
