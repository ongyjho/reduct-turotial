## 2020.09.03 우아한테크러닝 2회차(19:30~22:30)


### Summary
- 오늘의 수업 내용
	- 자바스크립트 A to Z
	- Redux 구현

### 값과 자바스크립트.
-  자바스크립트는 기본적으로 값을 리턴하는 것이 기본 동작이다. 값이 없을 경우는 `undefined` 값을 리턴하는 것이고.
-  자바스크립트에서는 `const bar = functon () { } ` 와 같이 변수에 함수도 할당을 할 수가 있는데, 함수도 값이라고 보기 때문이다. 그래서 함수를 인자로 넣고, 함수를 리턴할 수도 있는 것이다.
- `bar();` 와 같이 함수를 값으로 취급할 때는 이름을 생략할 수 있다. 
- 다만 ` function () { }` 와 같은 표현은 허용되지 않는다. 익명함수를 바로 쓰기 위해서는  `(function () { })()` 처럼 선언 직후 바로 호출을 해주어야 한다 (IIFE, Immediately Invoked Function Expression). 보통 이런 표현은 앱이 실행될 때 한번만 실행되어야 하는 경우 많이 볼 수 있다.


```
function foo2(x) {
	x();// 인자를 함수로 받는 경우
  	return function() {  } // 함수를 리턴하는 경우
}
```


- `foo2(function(){ })` 또는 `const y = foo2(function(){})` 처럼 호출 할 수 있다.  
- 이처럼 함수를 인자로 넘겨 주는 것을 콜백함수라고 하고, 함수의 호출을 위임한다고 보는 개념이다. 보통은 1급 함수(Higher-order Component, HoC) 라고 표현한다.

```
const ye = function sdfdsfd() {
    sdfdsfd();
} 
```
- 이렇게 재귀 함수를 만들때만 함수 이름을 넘겨준다.

#### 확장 표현
- ES6 이후 변형된 표현 중 유명한 것은 arrow function 이 있다. 람다식이라고도 부른다.

`const alpha = function () {} `
`const alpha = (x) => {}`  

- 자바스크립트는 크게 식, 문으로 나눌 수 있는데, 문(statement)는 우리가 익히 알고 있는 conditional statements(`while`, `for.. in`)등 처럼 값이 나오지 않는 형태를 취한다.
- 같은 맥락으로 식은 값을 반환하는 대부분의 형태를 의미한다. 즉 코드를 실행했을때 값으로 마무리 되면 식이라고 볼 수 있는 것이다. 자바스크립트에서 세미콜론이 붙거나 붙지 않을 수 있다고 생각하는데 정확하게는 값인 경우 세미콜론으로 마무리를 하고, 문인 경우 생략할 수 있기 때문이다.
- `;;; ` 과 같은 표현은 자바스크립트 엔진에서 컴파일 할 때 에러를 뱉지 않는다. 세미콜론 사이사이에 값이 있다고 판단하기 때문이다.

`const x = a => a * 2;
console.log(x(10));
`

`const x = 10;
const y = () => 10;`
- 그런 맥락에서 위의 두 표현은 같다. 차이점이 있다면 함수는 코드 내에서 변주가 가능하다.
- 한줄로 구성된 function 은 그 줄을 리턴하겠다는 의미로 해석되어 `return`을 생략할 수 있다.


### about `new`

```
function addas() {};
new addas();
const sdsads = new addas();
```

-  `new`를 사용하는 경우 인스턴스로 빈 객체를 전달하는데, 이때 전달된 객체를 지칭하기 위해 this. 를 사용하는 것이다.
- 객체에 존재하지 않는 property에 접근하는 경우 property가 없다면 새로 생성하고, 이를 동적 바인딩이라고 한다.
- 인스턴스 객체의 확인은`if(sdsads instanceof addas)`로 확인할 수 있다.

```
class bar {
    constructor(){
        this.name = 10
    }
}
```

- 클래스 또한 내부적으로는 함수이지만, 내부적으로는 아키텍처가 다르다. 
- 함수와 클래스 둘 다 new 를 붙여서 동작할 수 있지만, 함수는 `new` 연산자를 강제할 수 없다 . 이 경우 함수 내부의 property는 전역 스코프로 접근하게 된다.
- 앞에를 대문자로 써주는건 new로 호출하는 컨벤션이다. 
- 클래스는 `new`로만 호출 할 수 있다.



### 실행 컨텍스트

```
const person = {
    name: '홍여진',
    getName() {
        return this.name;
    }
}
person.getName();
```
- 위 코드에서 자바스크립트 엔진은 getName <- 을 누가 갖고 있는가?를 확인한다. 이렇게 호출하는 순간의 소유자를 확인하는 것을 실행 컨텍스트라고 한다. 위 코드의 경우 소유자는 당연히 person.

```
const man = person.getName;
man();
```
- 호출자가 없으므로, 전역 스코프로 연결이 된다. 즉, 브라우저 윈도 객체가 되는 것이다.
- 대개의 경우 함수가 실행될 시점을 적시 할 수 없다. 그래서 윈도우 이벤트 리스너의 도움을 받는 것이다. 

```
Button.addEventLisner('click', person.getName.bind(person));

person.getName.call(person);
person.getName().apply();
person.getName();
```
- 구버전의 자바스크립트에서는 bind, call과 같은 메소드를 이용해 소유자를 보장해주는 경우가 있었다.


### 클로저
```
function foo(x) {
    return function bar() {
        return x;
    }
}

const f = foo(10);
console.log(f());
//10 
```
- 위의 코드에서 ,`foo()`의 스코프는 호출된 직후 사라지지만 `bar()`의 closer가 이를 캡쳐해서 갖고 있는다. 이렇게 함수가 외부의 스코프를 기억하고 있는 상태를 클로저라고 한다.
- 클로저를 이용해 값을 스코프로 감싸서 보호할 수 있다.

### Promise
```
setTimeout((x) => {
    console.log('hello there');   
    setTimeout((y) => {
        console.log('bye there'); 
    }, 2000);
}, 1000);

```

- 자바스크립트는 싱글스레드이기 때문에 동기화가 어렵다.
- 비동기처리가 많아질 때는 콜백지옥에 빠질 수 있다.

```
const p1 = new Promise((resolve, reject) => {
    //resolve 함수 then 에 입력된 함수를 호출
    resolve('성공');
    //reject 함수 catch 에 입력된 함수를 호출
})
p1.then(function(res) {
    console.log(res);
    //'성공'클로저가 이걸 캐치한다.
  
})//thenable 객체, 또는 promise 객체

p1.catch(function() {

})
p1.then().catch();
```

```
async function main() {
    console.log('1')
    //3초
    await delay(2000);
    console.log('2')
}//비동기 함수 

try {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
} catch (e) {
    console.error(e)
} 
//이렇게 하면 catch가 reject로 잡을 수 있다.

main();
```
- `async-await` 를 사용하면 `await` 에서 `resolve`가 실행되기 전까지는 다음 라인을 처리하지 않는다.  `try-catch`  문 내에서 사용하는 경우 `catch`문에서 `reject` 를 잡을 수 있다.

### minimal Redux.js 구현
