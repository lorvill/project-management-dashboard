import { FetchError } from 'ofetch'

export default definePayloadPlugin(() => {
    definePayloadReducer('FetchError', (data) => {
        if (data instanceof FetchError) {
            return {
                statusCode: data.statusCode,
                statusMessage: data.statusMessage,
                message: data.message,
                data: data.data
            }
        }
    })
    definePayloadReviver('FetchError', (data) => {
        const err = new FetchError(data.message)
        Object.assign(err, data)
        return err
    })
})