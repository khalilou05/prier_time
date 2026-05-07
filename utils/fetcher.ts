export function fetcher(endpoint: `/${string}`) {
  return fetch(`https://ummahapi.com/api${endpoint}`).then((res) => res.json());
}
