import { parseJwt } from "./parse-jwt.function";

const tokenName = "badesaba/wheel/token";
const phoneNumberKey = "badesaba/wheel/phone";
const btokenName = "badesaba/wheel/btoken";

export interface IDecodedToken {
  authorization: string;
  xe?: string; // Android version
  xr?: string; // Theme color
}

export function getToken(): string | null {
  return localStorage.getItem(tokenName);
}

export function setToken(token: string): void {
  localStorage.setItem(tokenName, token);
}

export function removeToken(): void {
  localStorage.removeItem(tokenName);
}
export function removeBToken(): void {
  localStorage.removeItem(btokenName);
}


export function getPhone(): string | null {
  return localStorage.getItem(phoneNumberKey);
}

export function setPhone(phone: string): void {
  localStorage.setItem(phoneNumberKey, phone);
}

export function callAppUriLogin(phone: string, token: string): void {
  const url = `badesaba://auth?cellphone=${phone}&token=${token}`;
  window.open(url, "_self");
}

export function getBToken(): string | null {
  return localStorage.getItem(btokenName);
}

export function setBToken(data: string): void {
  localStorage.setItem(btokenName, data);
}

export function decodeBToken(): IDecodedToken | null {
  const token = getBToken();
  if (!token) return null;

  const data: IDecodedToken = parseJwt(token);
  if (data.authorization) setToken(data.authorization);
  return data;
}

export function loginApp(phone: string): void {
  const url = `badesaba://auth?cellphone=${phone}&token=${getToken()}`;
  window.open(url, "_self");
}
