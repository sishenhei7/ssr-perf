import autocannon, { Options as autocannonOptions } from 'autocannon'

export default async function stressTest(data: autocannonOptions) {
  // TODO: 使用chalk
  console.log('--- autocannon start: ', data)
  await autocannon(data)
  console.log('--- autocannon end')
}
