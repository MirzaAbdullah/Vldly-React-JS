import http from "./httpService";

const apiEndpoint = "/users";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(userId) {
  return http.get(userUrl(userId));
}

export function saveUser(user) {
  //UPDATE CASE
  if (user._id) {
    //To Remove user._id from passed object
    const body = { ...user };
    delete body._id;
    delete body.email;

    return http.put(userUrl(user._id), {
      password: body.password,
      name: body.name,
    });
  }

  //ADD NEW RECORD
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}
