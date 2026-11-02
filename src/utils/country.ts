import { getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { getNames, getCode } from "country-list";

export const countryOptions = getNames().map((name: string) => ({
  name,
  code: getCode(name) || ""
}));
export const getCallingCode = (countryCode: string) => {
  try {
    return `+${getCountryCallingCode(countryCode as CountryCode)}`;
  } catch {
    return "";
  }
};

export const getCountryFlag = (code: string) => {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};