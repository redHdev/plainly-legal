import { type SyntheticEvent } from "react";

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const onPromise = <T>({
  promise,
}: {
  promise: (event: SyntheticEvent) => Promise<T>;
}): ((event: SyntheticEvent) => void) => {
  return (event: SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        console.log("Unexpected error", error);
      });
    }
  };
};

export const converDateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateUSA = (date: Date | undefined): string => {
  if (!date || isNaN(date.getTime())) {
    return "Invalid date";
  }

  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "pm" : "am";

  let formattedHours = hours % 12;
  if (formattedHours === 0) {
    formattedHours = 12;
  }
  const paddedHours = formattedHours.toString().padStart(2, "0");

  const formattedMinutes = minutes.toString().padStart(2, "0");

  if (month === undefined || day === undefined || year === undefined) {
    return "Invalid date";
  }

  return `${month} ${day}, ${year} @ ${paddedHours}:${formattedMinutes}${period}`;
};

export const formatDateUSASimple = (date: Date | undefined): string => {
  if (!date || isNaN(date.getTime())) {
    return "Invalid date";
  }

  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();

  let formattedHours = hours % 12;
  if (formattedHours === 0) {
    formattedHours = 12;
  }

  if (month === undefined || day === undefined || year === undefined) {
    return "Invalid date";
  }

  return `${month} ${day}, ${year}`;
};

export default onPromise;
