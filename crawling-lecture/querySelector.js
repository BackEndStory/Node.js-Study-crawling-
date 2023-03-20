/*
document.querySelector(); 하나만 <=> $
document.queryAll(); 모두 <=> $$

ex) await page.$();
    await page.$$();

# : 태그의 아이디                     $('div#container')
. : 태그의 클래스(여러개 가능)            

$('div img');
div 태그를 펼쳤을 때 div 안에 있는 img를 선택 ( 부모 자손 )

*/

/*

$$('div > a > img')
>는
div 태그 아래에 a 태그가 있다 (부모 자식)

$('.score.score_left ')

. 앞에 div를 생략할 수 있다. score 과 score_left는 클래스가 두 개 일 수 있다는 것인데 .으로 연결하여 사용 가능한다. 

$('').textContent   -> 태그 안에 내용 도출
$('img[width=26]').innerHTML     -> 이미지 태그 중 width가 26인 것을 찾아라!

*/

