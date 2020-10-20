import React, { ReactNode } from 'react'
import loadable from '@loadable/component'
import { provideHooks } from 'redial'
import { fetchUsers } from 'redux/modules/user/actions'

const Users = loadable(() => import('./Users'))

function UsersLoadable(): ReactNode {
  return (
    <div>
      <Users />
    </div>
  )
}

export const hooks = {
  fetch: ({ store }) => {
    return store.dispatch(fetchUsers())
  }
}

export default provideHooks(hooks)(UsersLoadable)
