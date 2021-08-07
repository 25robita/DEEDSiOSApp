import { parse } from "node-html-parser"
import { getItemAsync } from 'expo-secure-store'

function fetchResource(resourcePath, masterOptions = {}) { // assumes creds are correct
    return new Promise((resolve, reject) => {
        fetch("https://deeds.cgs.vic.edu.au" + resourcePath, masterOptions)
            .then(r => {
                if (r.url.includes("loginuserpass")) {
                    getItemAsync("u")
                        .then(username => {
                            getItemAsync("p")
                                .then(password => {
                                    var options = {
                                        method: "POST",
                                        body: Object.entries(
                                            Object.assign({ username, password }, {
                                                AuthState: decodeURIComponent(r.url.split("?AuthState=")[1])
                                            })
                                        ).reduce((b, c) => (b.append(...c), b), new FormData())
                                    }
                                    fetch(
                                        "https://camberwell-login.cloudworkengine.net/module.php/core/loginuserpass.php",
                                        // r.url,
                                        Object.assign({}, masterOptions, options))
                                        .then(r => {
                                            if (r.url == "https://camberwell-login.cloudworkengine.net/module.php/core/loginuserpass.php") {
                                                reject(r)
                                                return
                                            }
                                            else resolve(r)
                                        })
                                })
                        })

                }
                else if (r.url.includes("SSOService.php?SAMLRequest")) {
                    r.text().then(t => {
                        var d = parse(t)
                        var SAMLResponseInpt = d.querySelector("input[name=SAMLResponse]")
                        var SAMLResponse = SAMLResponseInpt.attributes.value
                        fetch("https://deeds.cgs.vic.edu.au/saml/consume.php", Object.assign({}, masterOptions, {
                            method: "POST",
                            body: Object.entries({
                                SAMLResponse,
                                RelayState: "/login/"
                            }).reduce((a, b) => (a.append(...b), a), new FormData()) // has to be as formdata
                        }))
                            .then(resolve)
                    })
                }
                else if (!r.redirected) {
                    resolve(r)
                }
            })
    })

}

function fetchHTMLResource(resourcePath) {
    return new Promise((resolve, reject) => {
        fetchResource(resourcePath)
            .then(r => {
                if (Math.floor(r.status / 100) == 4) {
                    throw Error()
                }
                return r.text()
            }, reject)
            .then(t => resolve(parse(t)), reject)
    })
}

function fetchJSONResource(resourcePath, options) {
    return new Promise((resolve, reject) => {
        fetchResource(resourcePath, Object.assign({}, options, {
            header: {
                "Accept": "application/json, */*"
            }
        }))
            .then(r => r.json(), reject)
            .then(data => resolve(data), reject)
    })

}

export { fetchResource, fetchHTMLResource, fetchJSONResource }