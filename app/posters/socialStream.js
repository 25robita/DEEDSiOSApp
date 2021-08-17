import { postJSON } from "./post";

export function postSocialStream(homepageId, instanceId, body, url, parentId, rootId, type) {
    postJSON(
        `/socialstream/modifyForm.php?`
        , `type=${type ?? "string"}\
    &homepageId=${homepageId}\
    &instanceId=${instanceId}\
    &body=${body ?? ""}\
    &url=${url ?? ""}\
    &parentId=${parentId ?? 0}\
    &rootId=${rootId ?? 0}`
        , { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(r => {
            console.log("socialStream.js:14 says:", r.ok);
        })
}