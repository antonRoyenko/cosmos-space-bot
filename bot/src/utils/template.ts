export function template(string: string, vars: { [key: string]: string }) {
  let s = string;
  for (const prop in vars) {
    s = s.replace(new RegExp("%{" + prop + "}", "g"), vars[prop]);
  }
  return s;
}
