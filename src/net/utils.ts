import type { Json } from './datatypes';

export async function postData<T = Json>(
  url: string,
  data = {},
  headers = {}
): Promise<T> {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Length': JSON.stringify(data).length,
      ...headers,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getData<T = Json>(url: string, headers = {}): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers,
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}
