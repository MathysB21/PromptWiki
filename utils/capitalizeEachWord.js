// capitalize first character of each word in a string
export function capitalizeEachWord(str) {
    if (!str || typeof str !== "string") return str;
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
}