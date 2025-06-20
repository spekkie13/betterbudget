/*
Get the headers for an HTTP request
 */
function getHeaders(): Headers {
    const headers: Headers = new Headers()
    headers.set("Accept", "plain/text")
    headers.set("Content-Type", "application/json")
    return headers
}

/*
Create a Request object for HTTP request-methods that do NOT require a message body to be present
Url -> the URL the request should fetch
Method -> the method ('GET') that should be used by the fetch
*/
export function formRequestNoBody(url: string, method: string): RequestInfo {
    return new Request(url, {
        method: method,
        headers: getHeaders()
    })
}

/*
Create a Request object for HTTP request-methods that do require a message body to be present
Url -> the URL the request should fetch
Method -> the method ('POST' / 'PATCH') that should be used by the fetch
Body -> the body to be sent along in the request
*/
export function formRequestWithBody(url: string, method: string, body: any) {
    return new Request(url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
}
