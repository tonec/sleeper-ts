import { RouteConfig } from 'react-router-config'
import { NotFound } from 'components'
import { Home, Login, Users } from 'views'
import App from './App'

const routes: RouteConfig[] = [
  {
    component: App,
    routes: [
      { path: '/', exact: true, component: Home },
      { path: '/login', component: Login },
      { path: '/users', component: Users },
      { path: '/clients', component: Users },
      { path: '/sometheing', component: Users },
      { component: NotFound }
    ]
  }
]

export default routes
