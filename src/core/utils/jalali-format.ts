export const formatDateToJalali = (time:string) => {
  const date = new Date(time);
  const options = { calendar: "persian", numberingSystem: "arab" };

  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric", ...options }).format(date);
  const month = new Intl.DateTimeFormat("fa-IR", { month: "long", ...options }).format(date);
  const day = new Intl.DateTimeFormat("fa-IR", { day: "numeric", ...options }).format(date);

  return `${day} ${month} ${year}`;
}
