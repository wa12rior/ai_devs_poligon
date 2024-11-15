// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
  const API_URL_POLIGON = 'url_dane_txt';
  const API_URL_POLIGON2 = 'url_verify';

  const res = await fetch(API_URL_POLIGON)

  const body = await res.text();
  const ids = body.split(/\r?\n|\r|\n/g)
  
  const res2 = await fetch(API_URL_POLIGON2, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      task: 'POLIGON',
      apikey: 'api_key',
      answer: ids.filter(id => id.length > 0),
     })
  })

  const jsonres = await res2.json();

  return { message: jsonres }
})

// Run the server!
try {
  await fastify.listen({ port: 3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
