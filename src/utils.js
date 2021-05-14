export const getDate = (started) => {
  const nowDate = Date.now();
  const startedDate = !isNaN(Number(started))
    ? new Date(parseInt(started)).getTime()
    : new Date(started).getTime();
  const dateGap = nowDate - startedDate;
  if (dateGap <= 1000 * 60) {
    return parseInt(dateGap / 1000) + "초 전";
  } else if (dateGap <= 1000 * 60 * 60) {
    return parseInt(dateGap / (1000 * 60)) + "분 전";
  } else if (dateGap <= 1000 * 60 * 60 * 24) {
    return parseInt(dateGap / (1000 * 60 * 60)) + "시간 전";
  } else if (dateGap <= 1000 * 60 * 60 * 24 * 7) {
    return parseInt(dateGap / (1000 * 60 * 60 * 24)) + "일 전";
  } else if (dateGap <= 1000 * 60 * 60 * 24 * 30) {
    return parseInt(dateGap / (1000 * 60 * 60 * 24 * 7)) + "주 전";
  } else if (dateGap <= 1000 * 60 * 60 * 24 * 365) {
    return parseInt(dateGap / (1000 * 60 * 60 * 24 * 30)) + "개월 전";
  } else if (1000 * 60 * 60 * 24 * 365 < dateGap) {
    return parseInt(dateGap / (1000 * 60 * 60 * 24 * 365)) + "년 전";
  }
};

export const getTime = (milSec) => {
  const today = new Date(parseInt(milSec));
  let hour = today.getHours();
  let minute = today.getMinutes();

  const isAM = hour < 12;
  hour = hour % 12 || 12;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;

  const now = `${isAM ? "오전" : "오후"} ${hour}:${minute}`;
  return now;
};

export const addCommas = (number) => {
  if (!number) {
    return;
  }
  if (Number.isInteger(number)) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export function copyToClipboard(textToCopy) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    let textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise((res, rej) => {
      // here the magic happens
      document.execCommand("copy") ? res() : rej();
      textArea.remove();
    });
  }
}
