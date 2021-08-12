import { parse } from "node-html-parser"
import { getItemAsync } from 'expo-secure-store'

function fetchResource(resourcePath, masterOptions = {}) { // assumes creds are correct
    return new Promise((resolve, reject) => {
        fetch("https://deeds.cgs.vic.edu.au" + resourcePath, masterOptions)
            .then(r => {
                console.log("get.js:8 says:", "hello");
                if (r.url.includes("loginuserpass")) {
                    console.log("get.js:10 says:", "hello");
                    getItemAsync("u")
                        .then(username => {
                            console.log("get.js:12 says:", "hello");
                            getItemAsync("p")
                                .then(password => {
                                    console.log("get.js:14 says:", "hello");
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
                    console.log("get.js:41 says:", "hello");
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
                    console.log("get.js:57 says:", "hello");
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
            .then(t => {
                console.log("get.js:75 says:", "hello");
                resolve(parse(t))
                console.log("get.js:77 says:", "hi");
            }, reject)
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