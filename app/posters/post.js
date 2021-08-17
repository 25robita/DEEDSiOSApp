import { fetchResource } from "../getters/get"

export function postJSON(path, body, options) {
    return new Promise((resolve, reject) => {
        fetchResource(path, Object.assign({}, options, {
            method: "POST",
            body: body
        }))
            .then(r => resolve(r), reject)
    })
}