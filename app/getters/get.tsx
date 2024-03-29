import { getItemAsync } from "expo-secure-store";
import { HTMLElement, parse } from "node-html-parser";
import { serviceURL } from "../consts";

function fetchResource(resourcePath: string, masterOptions: any = {}) {
    // assumes creds are correct
    return new Promise((resolve, reject) => {
        fetch(serviceURL + resourcePath, masterOptions).then((r: any) => {
            if (r.url.includes("loginuserpass")) {
                getItemAsync("u").then((username) => {
                    getItemAsync("p").then((password) => {
                        var options = {
                            method: "POST",
                            body: Object.entries(
                                Object.assign(
                                    { username, password },
                                    {
                                        AuthState: decodeURIComponent(
                                            r.url.split("?AuthState=")[1]
                                        ),
                                    }
                                )
                            ).reduce((b, c) => (b.append(...c), b), new FormData()),
                        };
                        fetch(
                            "https://camberwell-login.cloudworkengine.net/module.php/core/loginuserpass.php",
                            // r.url,
                            Object.assign({}, masterOptions, options)
                        ).then((r) => {
                            if (
                                r.url ==
                                "https://camberwell-login.cloudworkengine.net/module.php/core/loginuserpass.php"
                            ) {
                                reject(r);
                                return;
                            } else resolve(r);
                        });
                    });
                });
            } else if (r.url.includes("SSOService.php?SAMLRequest")) {
                r.text().then((t: string) => {
                    var d = parse(t);
                    var SAMLResponseInpt = d.querySelector("input[name=SAMLResponse]");
                    var SAMLResponse = SAMLResponseInpt.attributes.value;
                    fetch(
                        serviceURL + "/saml/consume.php",
                        Object.assign({}, masterOptions, {
                            method: "POST",
                            body: Object.entries({
                                SAMLResponse,
                                RelayState: "/login/",
                            }).reduce((a, b) => (a.append(...b), a), new FormData()), // has to be as formdata
                        })
                    ).then(resolve);
                });
            } else if (!r.redirected) {
                resolve(r);
            }
        });
    });
}

function fetchHTMLResource(resourcePath: string): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
        fetchResource(resourcePath)
            .then((r: any) => {
                if (Math.floor(r.status / 100) == 4) {
                    throw Error();
                }
                return r.text();
            }, reject)
            .then((t: string) => resolve(parse(t)), reject);
    });
}

function fetchJSONResource(resourcePath: string, options: any): Promise<object | any[]> {
    return new Promise((resolve, reject) => {
        fetchResource(
            resourcePath,
            Object.assign({}, options, {
                header: {
                    Accept: "application/json, */*",
                },
            })
        )
            .then((r: any) => r.json(), reject)
            .then((data: any) => resolve(data), reject);
    });
}

export { fetchResource, fetchHTMLResource, fetchJSONResource };
