const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (input: number | string): string =>
  String(input).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export const toEn = (input: string): string =>
  input.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));

export const formatBnPrice = (n: number): string =>
  toBn(n.toLocaleString("en-US"));

export const unitBn = (unit: string): string => {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return map[unit] ?? `প্রতি ${unit}`;
};

const BN_WEEKDAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const BN_GREGORIAN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function getBanglaDate(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  const weekdayEn = get("weekday");
  const day = get("day");
  const monthEn = get("month");
  const year = get("year");

  const enWeekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const enMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekdayBn = BN_WEEKDAYS[enWeekdays.indexOf(weekdayEn)] ?? "";
  const monthBn = BN_GREGORIAN_MONTHS[enMonths.indexOf(monthEn)] ?? "";

  return `${weekdayBn}, ${toBn(day)} ${monthBn}, ${toBn(year)}`;
}
