/**
 * Parse the date string from moneycontrol.com
 * @param dateString
 * @returns Date
 * @example
 * parseMCDate("February 23, 2023 05:53 PM IST")
 * // returns Date object
 * // Date {Sat Feb 23 2023 17:53:00 GMT+0530 (India Standard Time)}
 */
export function parseMCDate(dateString: string): Date {
  // February 23, 2023 05:53 PM IST is the format
  const dateArray = dateString.split(" ");
  const month = dateArray[0];
  const day = dateArray[1].replace(",", "");
  const year = dateArray[2];
  const time = dateArray[3];
  const ampm = dateArray[4];
  const timeArray = time.split(":");
  const hour = timeArray[0];
  const minute = timeArray[1];
  const second = "00";
  const date = new Date(
    `${month} ${day}, ${year} ${hour}:${minute}:${second} ${ampm}`
  );
  return date;
}
