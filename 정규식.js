const char = "aaaaadocument.write(+(TwoOneFourOne^FourFourSix)+(Two1OneFour^SixFiveZero)+(One9EightSix^One0Eight)+(ThreeSevenFiveTwo^NineEightOne))";
const a = char.replace(/document\.write\(\+/,"");
console.log(a);