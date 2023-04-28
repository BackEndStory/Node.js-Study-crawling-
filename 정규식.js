const char = "aaaaadocument.write(+(TwoOneFourOne^FourFourSix)+(Two1OneFour^SixFiveZero)+(One9EightSix^One0Eight)+(ThreeSevenFiveTwo^NineEightOne))";
const a = char.replace(/\(.+/,"");   // (에 모든 문자 숫자가 오는 => . 반복되는 것들을 모두 => + 를 모두 빈 문자열로 만든다.
//console.log(a);


const practice1 = "aaa .(2334aplle)+(abcdefg)";
console.log(practice1.replace(/\.\(.+/,""));
console.log(practice1.replace(/\s/,""));
console.log(practice1.replace(/\d/,""));
console.log(practice1.replace(/\D/,""));
console.log(practice1.replace(/\b/,""));