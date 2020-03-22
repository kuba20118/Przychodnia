export default function apiCaller<T>(
  method: string,
  path: string,
  data?: any
): Promise<T[] | null> {
  return fetch(path, {
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("przychodnia-jwt")}`,
      "Content-Type": "application/json"
    },
    body: data ? JSON.stringify(data) : null
  }).then((response) => {
    return new Promise((resolve, reject) => {
      if (response.status === 401) {
        reject(new Error("401"));
      }
      if (response.status === 500) {
        reject(new Error("Server critical error. Try again later."));
      }
      if (
        (response.status >= 200 && response.status < 300) ||
        response.status === 400
      ) {
        response.json().then((json) => resolve(json));
      }
    });
  });
}
