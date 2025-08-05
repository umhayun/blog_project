export async function FetchDB(method: string, api: string, param: string, body?: object) {
    const uri = (param === "")? `/api/${api}/` : `/api/${api}/?${param}` 
    const response = await fetch(uri, {        
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const result = await response.json()
    return result
}
