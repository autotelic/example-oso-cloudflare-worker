import { Expense, db, User, ROLES } from './expense'
import getOso from './oso'
// See webpack.config.js setings to
// properly import .polar files
import expensesRules from './expenses.polar'

// import { Oso } from 'oso' <-- Not Allowed
// WebAssembly download and compilation must happen asynchronously.

async function handleRequest (request) {
  const oso = await getOso()

  // oso.loadFile is not supported in browsers or webworkers
  // expensesRules is imported as a string
  oso.loadStr(expensesRules)

  const [_, __, ___, resource, id] = request.url.split('/')
  // Look up the requested expense in our "database"
  const expense = db[id]

  // 404 if the requested path doesn't match /expenses/:id
  // or the requested expense ID doesn't exist in our "database"
  if (resource !== 'expenses' || !expense) {
    return new Response('Not Found!\n', {
      status: 404,
      headers: { 'content-type': 'text/plain' }
    })
  }

  const { email } = await request.json()

  const actor = new User(email)

  const action = 'view' // default action to be view always.


  if (await oso.isAllowed(actor, action, expense)) {
    const payload = JSON.stringify({ expense })

    return new Response(`${payload}\n`, {
      headers: { 'content-type': 'application/json;charset=UTF-8' }
    })
  } else {
    return new Response('Not Authorized!', {
      status: 401,
      headers: { 'content-type': 'text/plain' }
    })
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
