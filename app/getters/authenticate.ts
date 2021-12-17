import { serviceURL } from "../consts";

interface AuthUserInfo {
    key: string,
    username: string,
    id: string,
    role: string
}

export function authenticate(username: string, password: string): Promise<AuthUserInfo> {
    return new Promise((res, rej) => {
        const url = new URL("/api/session", serviceURL);
        // console.log("authenticate.ts:13 says:", new URLSearchParams({ username: encodeURIComponent(username), password: encodeURIComponent(password) }).toString());
        console.log("authenticate.ts:13 says:", "obtained url", url);
        fetch(url.href, {
            method: "POST",
            body: new URLSearchParams({
                username: encodeURIComponent(username),
                password: encodeURIComponent(password),
            }).toString(),
            // body: "username=25robita&password=hhdvD*ez8bEGFLrs%5EtjLNHLk%23X%24%40R%26",
            headers: {
                Accept: "application/json",
            }
        }).then(async r => {
            if ((Math.floor(r.status / 100) == 2)) {
                res(await r.json())
            } else rej()
        }, rej)
    })
}