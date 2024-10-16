// capitalize first character of each word in a string
export function capitalize(str) {
    if (!str || typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
  