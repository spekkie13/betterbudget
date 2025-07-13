function getHeaders(): Headers {
    const headers: Headers = new Headers()
    headers.set("Accept", "plain/text")
    headers.set("Content-Type", "application/json")
    return headers
}

export function formRequestNoBody(url: string, method: string) : Request {
    return new Request(url, {
        method: method,
        headers: getHeaders()
    })
}

export function formRequestWithBody(url: string, method: string, body: any) : Request {
    return new Request(url, {
        method: method,
        headers: getHeaders(),
        body: JSON.stringify(body)
    })
}
