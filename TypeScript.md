# TypeScript 사용

# 타입(Type)

## 타입 선언 (Type Declaration)

변수명 뒤에 타입을 명시해야 한다.

```typescript
let foo: string = 'hello';
let bar: number = true;
// number 와 true 타입이 맞지 않아 에러가 발생한다.
```

타입 선언은

- 개발자가 코드를 예측할 수 있도록 돕는다.
- 기본적인 오류를 런타임 이전에 검출한다.
- 따라서 개발 효율이 향상된다.

[TypeScript 의 타입](https://www.notion.so/d6d52bee6bcd4cb4ab5615941f0b9625)

```typescript
function multiply1(x: number, y: number): number {

return x * y;

}

const multiply2 = (x: number, y: number): number => x * y;

console.log(multiply1(10, 2));

console.log(multiply2(10, 3));

// console.log(multiply1(true, 1)); 에러

// 타입 선언

// boolean

let isDone: boolean = false;

// null

let n: null = null;

// undefined

let u: undefined = undefined;

// number

let decimal: number = 6;

let hex: number = 0xf00d;

let binary: number = 0b1010;

let octal: number = 0o744;

// string

let color: string = "blue";

color = 'red';

let myName: string = `Lee`;

let greeting: string = `Hello, my name is ${ myName }.`;

// object

const obj: object = {};

// array

let list1: any[] = [1, 'two', true];

let list2: number[] = [1, 2, 3];

let list3: Array<number> = [1, 2, 3]; // 제네릭 배열 타입

// tuple: 고정된 요소 수만큼 타입을 미리 선언 후 배열 표현

let tuple: [string, number];

tuple = ['hello', 10];

// tuple = [10, 'hello']; // Error

// tuple = ['hello', 10, 'world', 100]; // Error

// tuple.push(true); // Error

// enum: 열거형은 숫자값 집합에 이름을 지정한 것이다.

enum Color1 { Red, Green, Blue };

let c1: Color1 = Color1.Green;

console.log(c1); // 1

enum Color2 { Red = 1, Green, Blue };

let c2: Color2 = Color2.Green;

console.log(c2); // 2

enum Color3 { Red = 1, Green = 2, Blue = 4 };

let c3: Color3 = Color3.Blue;

console.log(c3); // 4
/*

any: 타입 추론(type inference)할 수 없거나 타입 체크가 필요 없는 변수에 사용.

var 키워드로 선언한 변수처럼 어떤 타입의 값이라도 할당 할 수 있다.

*/
let notSure: any = 4;

notSure = 'maybe a string instead';

notSure = false; // 완전 boolean

// void: 일반적으로 함수에서 반환값이 없을 경우 사용한다.

function warnUser(): void {

console.log("This is my warning message");

}

// never: 결코 발생하지 않는 값

function infiniteLoop(): never {

while (true) {}

}

function error(message: string): never {

throw new Error(message);

}

// 타입은 소문자, 대문자를 구별하므로 주의해야 한다.

// string: primitive 타입 문자열

let primiteveStr: string;

primiteveStr = 'hello';

// primiteveStr = new String('hello'); // Error

/*

'String' 형식은 'string' 형식에 할당할 수 없습니다.

string'은(는) 기본 개체이지만 'String'은(는) 래퍼 개체입니다.

가능한 경우 'string'을(를) 사용하세요.

*/

// String: String 생성자 함수로 생성된 String 래퍼 객체 타입

let objectStr: String;

objectStr = 'hello';

objectStr = new String('hello');

/*

string < String 할당 # 에러

string > Stirng 할당 # 가능

*/

// Date 타입

const today: Date = new Date();

// HTMLElement 타입

const elem: HTMLElement = document.getElementById('myId');

class Person {}

// Person 타입

const person: Person = new Person();
```

---

## 정적 타이핑(Static Typing)

### 정적 타이핑

✔ 변수에 할당할 값의 타입에 따라 사전에 타입을 명시적으로 선언하고, 선언에 맞는 값을 할당하는 것을 정적 타이핑(Static Typing)이라고 한다.

✔ 자바스크립트는 동적 타입(dynamic typed) 언어이다.

즉, 변수의 타입 선언 없이 값이 할당되는 과정에서 동적으로 타입을 추론(Type Inference)한다는 의미이다.

타입 추론으로 변수의 타입이 결정된 후에도 같은 변수에 여러 타입의 값을 할당할 수 있는 것을 동적 타이핑(Dynamic Typing)이라고 한다.

사용하기는 편하지만 예상치 못한 오류가 생길 수 있다.

✔ Type Script 의 가장 독특한 특징은 **정적 타이핑**을 지원한다는 것이다.

타입을 명시적으로 선언하고, 이후에 타입을 변경할 수 없다. 잘못된 타입 값이 할당 또는 반환되면 컴파일 단계에서 에러가 발생한다.

✔ 코드 가독성, 예측성, 안정성의 향상

---

## 타입 추론(Type Inference)

✔ 타입을 선언하지 않으면 타입 추론에 의해 변수의 타입이 결정된다. 하지만 정적 타입 언어는 타입이 결정된 후 변경할 수 없다. 

TypeScript 에서 타입이 결정된 후(선언과 타입 추론 모두) 다른 타입의 값을 할당할 수 없다.

✔ 타입을 추론할 수 없으면 `any` 타입이 되는데, 어떤 타입의 값도 재할당이 가능하다. 그러나 정적 타입 언어의 장점을 없애기 때문에 사용하지 않는 편이 좋다.

---

# 클래스(Class)

ES6 클래스는 클래스 몸체에 메소드만을 포함한다. 클래스 몸체 안에 프로퍼티를 선언할 수 없고 반드시 생성자 내부에서 프로퍼티를 선언하고 초기화한다.

```typescript
class Person {
	constructor(name) {
		// 클래스 프로퍼티의 선언과 초기화
		this.name = name;
	}
	walk () {
		console.log(`${this.name} is walking.`);
	}
}
```

TypeScript 클래스는 클래스 몸체에 클래스 프로퍼티를 사전 선언해야 한다.

```typescript
class Person {
    // 클래스 프로퍼티 사전 선언
    name: string;

    constructor(name: string) {
        // 클래스 프로퍼티에 값을 할당
        this.name = name;
    }

    walk() {
        console.log(`${this.name} is walking.`);
    }
}

const person = new Person2('Lee');
person.walk();
```

---

## 접근 제한자(Access modifier)

[접근 제한자](https://www.notion.so/50f30961c3a24ae08a3572a2d50706e3)

접근 제한자를 생략할 경우 암묵적으로 `public` 이 선언되므로 `public` 은 접근 제한자를 생략한다.

---

## 생성자 파라미터에 접근 제한자 선언

접근 제한자는 생성자 파라미터에서도 선언할 수 있다. 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다. 생성자 내부에서 별도 초기화가 없어도 암묵적으로 초기화가 수행된다.

private 접근 제한자가 사용되면 클래스 내부에서만, public 접근 제한자가 사용되면 클래스 외부에서도 참조 가능하다.