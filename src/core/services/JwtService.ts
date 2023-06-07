// const ID_TOKEN_KEY = "id_token" as string;

/**
 * @description get token form localStorage
 */
 export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getLang = (): string | null => {
  return localStorage.getItem("lang");
};
export const getKey = (): any | null => {
  return localStorage.getItem("key");
};
export const getName = (): string | null => {
  return localStorage.getItem("name");
};
export const getEmail = (): string | null => {
  return localStorage.getItem("email");
};
export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveToken = (token): void => {
  localStorage.setItem('token', token);
};

export const saveUser = (user): void => {
  console.log("this.user = hh = ",user);
  console.log("this.user = hh = ", user.id);
  localStorage.setItem('name', user.name);
  localStorage.setItem('email', user.email);
  localStorage.setItem('token', user.token);
  localStorage.setItem('lang', "ar");
  localStorage.setItem('key', user.id);
};

export const saveUpdateUser = (user): void => {
  localStorage.setItem('name', user.name);
  localStorage.setItem('email', user.email);
  localStorage.setItem('key', user.id);
  localStorage.setItem('lang', 'ar');
  console.log("key", localStorage.getItem("key"));
  console.log("key", localStorage.getItem("lang"));
};
/**
 * @description remove token form localStorage
 */
export const destroyToken = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('lang');
};

export default { getLang, getToken, saveToken, destroyToken ,saveUpdateUser, getRole , getKey ,getName , getEmail,saveUser };
