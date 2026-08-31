export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', (event) => {
    if (!event.path.startsWith('/api/')) return

    event.context.startedAt = performance.now()

    console.log(`[request] ${event.method} ${event.path}`)
  })

  nitroApp.hooks.hook('afterResponse', (event) => {
    if (!event.path.startsWith('/api/')) return

    const startedAt = event.context.startedAt

    if (typeof startedAt !== 'number') return

    const duration = Math.round(performance.now() - startedAt)

    console.log(
      `[response] ${event.method} ${event.path} — ${duration}ms`,
    )
  })
})