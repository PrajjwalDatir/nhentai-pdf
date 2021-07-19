import Doujin from '../Doujin'

const ValidateID = () => {
    return (target: Doujin, key: keyof Doujin): void => {
        let value = target[key]
        const get = () => value

        const set = (id: string) => {
            value = id.trim().replace(/(https?:\/\/nhentai\.net\/g\/)(\d+)\/?/, '$2')
        }

        Object.defineProperty(target, key, {
            get,
            set,
            enumerable: true,
            configurable: true
        })
    }
}

export default ValidateID
