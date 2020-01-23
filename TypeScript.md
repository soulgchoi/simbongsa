# 공부하기 전에

## TypeScript 튜토리얼

TypeScript 는 자바스크립트의 대체 언어이자, ES5의상위확장(Superset)이다.

- 프로토타입 객체

- Scope와 this
- 동적 타입 언어

라는 세 가지 자바스크립트의 특성을 극복하고자 등장했다.

ES5 기반이지만 ES6 기능도 사용할 수 있다.

```typescript
function sum(a:number, b: number) {
    return a + b;
}

sum('x', 'y');
// 인자가 반드시 숫자여야 하므로 에러
```

명시적인 정적 타입으로 디버깅을 쉽게 한다.

`$ npm install -g typescript`

파일 작성 뒤

`$ tsc <file name> -t ES2015`

자바스크립트 파일로 트랜스파일링

`$ tsc --init`

으로 tsc 옵션 설정 파일 `tsconfig.json` 을 생성해 target 을 지정할 수 있다. 

이후 `$ node <js file>` 로 출력내용을 확인할 수 있다.

`$ tsc --watch` 옵션을 사용하면 트랜스파일링 대상 파일의 변경 내용을 감지하여 자동으로 트랜스파일링한다.

---

## TypeScript 환경 설정

VS Code 를 사용한다.

`tsconfig.json` 파일을 설정하여 옵션 설정시 중복되는 활동을 방지한다.

```typescript
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  },
{  // 컴파일 대상 파일 리스트
  "include": [
    "src/**/*"
  ], // 컴파일 대상 제외 리스트
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
}
```

`Ctrl + Shift + P` > task 검색 > 기본 작업 빌드 구성 > tsc 빌드 > `Ctrl + Shift + B` 단축키로 트랜스파일 가능해진다.

JS 라이브러리도 타입체크를 하기 위해

    $ npm init -y
    $ npm install lodash --save
    $ npm install @types/lodash --save-dev

---

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

[TypeScript 의 타입](TypeScript/TypeScript.csv)

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

[constructor](TypeScript/constructor.md)

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

[접근 제한자](TypeScript/Untitled.csv)

접근 제한자를 생략할 경우 암묵적으로 `public` 이 선언되므로 `public` 은 접근 제한자를 생략한다.

---

## 생성자 파라미터에 접근 제한자 선언

접근 제한자는 생성자 파라미터에서도 선언할 수 있다. 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언된다. 생성자 내부에서 별도 초기화가 없어도 암묵적으로 초기화가 수행된다.

private 접근 제한자가 사용되면 클래스 내부에서만, public 접근 제한자가 사용되면 클래스 외부에서도 참조 가능하다.

---

## readonly 키워드

✔ readonly 가 선언된 클래스 프로퍼티는 선언시, 또는 생성자 내부에서만 값을 할당한다. 그 외의 경우에는 오직 읽기만 가능하다. 상수의 선언에 주로 사용한다.

---

## static 키워드

✔ TypeScript 에서는 `static` 키워드를 클래스 프로퍼티에 사용할 수 있다. 정적 클래스 프로퍼티는 인스턴스가 아닌 클래스 이름으로 호출하며 클래스 인스턴스를 생성하지 않아도 호출할 수 있다.

---

## 추상 클래스(Abstract Class)

✔ 추상 메소드는 내용이 없이 메소드 이름과 타입만 선언된 메소드를 말한다.

✔ 하나 이상의 추상 메소드를 포함하며, 일반 메소드도 포함할 수 있다. 선언할 때 `abstract` 키워드를 사용해 선언하고, 직접 인스턴스를 생성할 수는 없고 상속만을 위해 사용된다.

✔ 추상 클래스를 상속한 클래스는 추상 클래스의 메소드를 반드시 구현해야 한다.

---

# 인터페이스(Interface)

✔ 타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용할 수 있다. 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의한다고 볼 수 있다. 인터페이스에 선언된 프로퍼티 또는 메서드의 구현을 강제하여 일관성을 유지할 수 있도록 한다.

✔ 프로퍼티와 메서드를 가질 수 있지만, 직접 인스턴스를 생성할 수 없고 모든 메서드는 추상 메서드이다. 대신 `abstract` 키워드를 사용하지 않는다.

## 변수와 인터페이스

✔ 인터페이스를 변수의 타입으로 사용할 수 있다. 이 변수는 해당 인터페이스를 준수해야 한다. 

```typescript
interface Todo {
	id: number;
	content: string;
	completed: boolean;
}

// 변수 todo 의 타입으로 Todo 인터페이스 선언
let todo: Todo;

// 변수 todo 는 Todo 인터페이스를 준수한다.
todo = { id: 1, content: 'typescript', completed: false };
```

✔ 함수 파라미터 타입을 선언할 수도 있다. 함수에 객체를 전달할 때 복잡한 매개변수 체크가 필요없어 유용하다.

```typescript
interface Todo {
	id: number;
	content: string;
	completed: boolean;
}

let todos: Todo[] = [];

// 파라미터 todo 값으로 Todo 인터페이스 선언
function addTodo(todo: Todo) {
	todos = [ ... todos, todo];
}

// 파라미터 todo 는 Todo 인터페이스를 준수해야 한다.
const newTodo: Todo = {
	id: 1, 
	content: 'typescript',
	completed: flase
};
addTodo(newTodo);
console.log(todos)
// [ { id: 1, content: 'typescript', completed: false } ]
```

✔ 함수 타입으로 인터페이스를 사용할 수 있다. 이 때 타입이 선언된 파라미터 리스트와 리턴 타입을 정의해야 한다.

✔ 클래스 선언문의 implements 뒤에 인터페이스를 선언하면 해당 클래스는 지정된 인터페이스를 반드시 구현해야 한다. 프로퍼티와 메서드를 가질 수 있다는 점에서 클래스와 유사하지만, 직접 인스턴스를 생성할 수는 없다. 

✔ 인터페이스는 메서드도 포함할 수 있다. 단, 모든 메서드는 추상 메서드여야 한다.



---



# 리액트 앱 만들기

`$ npx create-react-app <app_name> --typescript`

# 컴포넌트 생성

✔ 클래스형 컴포넌트 생성 방식은 JS와 같다.

```typescript
import React from 'react';

class ComponentName extends React.Component {
	render() {
		return ();
	}
}

export default ComponentName;
```

# 라우터

✔ 라우터를 사용하기 위해 몇가지 모듈을 설치한다.

- 타입스크립트용

`$ npm i @types/react-router-dom --save-dev`

`$ npm i @types/node`

✔ 참고한 예제에서는 `HashRouter` 를 사용하고 있으나, `BrowserRouter` 를 사용한다.

Can't resolve 'react-router-dom' 에러가 발생, 모듈을 리액트 앱 바깥 폴더에 설치해서였음

# Form & Submit

👩‍💻 아래 링크를 참고해서 작성했다. 

[https://www.youtube.com/watch?v=kg-stzmtflo&list=PLiKs97d-BatHEeclprFtCaw8RcNOYXUqN&index=4](https://www.youtube.com/watch?v=kg-stzmtflo&list=PLiKs97d-BatHEeclprFtCaw8RcNOYXUqN&index=4)

✔ 아래와 같이 form 을 만들고 시작한다. 

```typescript
import React from 'react'

class InputForm extends React.Component<{}, {}> {
	handleSubmit(e: any) {
            e.preventDefault();
						// 이벤트가 잘 작동되는지 확인
	}

	render() {
        return (
            <div>
            <h1>이것은 리액트 폼이다...</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="여긴 인풋"
                />
                <button type="submit">이건 버튼</button>
            </form>
            </div>
        )
    }
}
```

✔ 인풋을 받기 위해 아래와 같이 `state` 를 만들었다.

```typescript
import React from 'react'

class InputForm extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentInput: "",
            myInputText: [],
        }
    }
    handleSubmit(e: any) {
            e.preventDefault();
            this.setState({
                currentInput: "",
                myInputText: [
                    ...this.state.myInputText,
                    this.state.currentInput,
                ]
            })
    }

    render() {
        console.log(this.state);
        return (
            <div>
            <h1>이것은 리액트 폼이다...</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="여긴 인풋"
                    value={this.state.currentInput}
                    onChange={(e) => 
                    	this.setState({ currentInput: e.target.value})
					}
                />
                <button type="submit">이건 버튼</button>
            </form>
            </div>
        )
    }
}
export default InputForm;
```

이 상태에서는 

`Property 'myInputText' does not exist on type 'Readonly<{}>`

에러가 발생한다. 

✔ 아래처럼 `interface` 를 추가하고, 컴포넌트에도 준다.

```typescript
import React from 'react'

interface IState {
    currentInput: string;
    myInputText: Array<string>;
}
class InputForm extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currentInput: "",
            myInputText: [],
        }
    }
    handleSubmit(e: any) {
            e.preventDefault();
            this.setState({
                currentInput: "",
                myInputText: [
                    ...this.state.myInputText,
                    this.state.currentInput,
                ]
            })
    }
    render() {
        console.log(this.state);
        return (
            <div>
            <h1>이것은 리액트 폼이다...</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="여긴 인풋"
                    value={this.state.currentInput}
                    onChange={(e) => this.setState({ currentInput: e.target.value})}
                />
                <button type="submit">이건 버튼</button>
            </form>
            </div>
        )
    }
}
export default InputForm;
```

✔ 콘솔에서 확인할 수 있다.

    {currentInput: "", myInputText: Array(2)}
    currentInput: ""  // 이 부분은 입력할때마다 바뀐다.
    myInputText: (2) ["입력한다", "입력했다"]
    // submit 하면 currentInput 이 array 에 들어간다.
    __proto__: Object