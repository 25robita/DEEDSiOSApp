import { postJSON } from "./post";

export function postSocialStream(
  homepageId: string,
  instanceId: string,
  body: string,
  url: string,
  parentId: string,
  rootId: string,
  type: string
): void {
  postJSON(
    `/socialstream/modifyForm.php?`,
    `type=${type ?? "string"}\
    &homepageId=${homepageId}\
    &instanceId=${instanceId}\
    &body=${body ?? ""}\
    &url=${url ?? ""}\
    &parentId=${parentId ?? 0}\
    &rootId=${rootId ?? 0}`,
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  ).then((r: any) => {
    console.log("socialStream.js:14 says:", r.ok);
  });
}
