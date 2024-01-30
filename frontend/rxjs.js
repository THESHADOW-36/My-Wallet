import { Observable } from "rxjs";
// console.log("Hello................")

console.log("Start")
const observable = new Observable((observer) => {
   observer.next("Num 1");
   observer.next("Num 2");
   observer.next("Num 3");
   setTimeout(() => {
      observer.next("Num 4");
      observer.complete();
   }, 1000);
});

console.log("Before")

observable.subscribe({
   next(Num) {
      console.log('got value ' + Num);
   },
   error(err) {
      console.error('something wrong occurred: ' + err);
   },
   complete() {
      console.log('done');
   },
});
console.log("After")