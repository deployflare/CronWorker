import mail from './mailer.js'
async function scheduled(controller, env, ctx) {
    const lastCount = await env.KV_MIE.get('count')
    const latestCount = (await env.KV_MIE.list()).keys.length-1
    if (lastCount != latestCount)
    {
        await mail(env, latestCount-lastCount, 'New Mie Sub!')
        await env.KV_MIE.put('count', latestCount)
    }
}

export default { scheduled }
