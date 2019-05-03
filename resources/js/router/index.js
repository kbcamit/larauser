import Vue from 'vue'
import Router from 'vue-router'
import Profile from '../components/Profile'
import Dashboard from '../components/Dashboard'
import Users from '../components/Users'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        }
    ],
    mode: 'history',
    linkActiveClass: 'active'
})
