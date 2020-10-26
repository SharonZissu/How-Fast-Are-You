export function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

export const animals = [
  { name: "chita", time: "<= 30 Seconds" },
  { name: "gnu", time: "<= 40 Seconds" },
  { name: "horse", time: "<= 50 Seconds" },
  { name: "elephant", time: "<= 65 Seconds" },
  { name: "sloth", time: "<= 85 Seconds" },
  { name: "turtle", time: "> 85 Seconds" },
];

export const formatTime = (t, fiveSecHelperIsClicked) => {
  console.log("fiveSecHelperIsClicked", fiveSecHelperIsClicked);
  console.log("t", t);
  if (!fiveSecHelperIsClicked) {
    console.log("A");
    return (t / 1000).toFixed(2);
  } else {
    console.log("B");

    return (t / 1000 - 5).toFixed(2);
  }
};
