## Item 1. typescript와 javascript의 관계 이해하기

### typescript

- typescript는 javascript의 상위 집합입니다.
    - 모든 javascript 프로그램이 typescript : true
    - 모든 typescript 프로그램이 javascript : false
    - 일부 javascript (그리고 typescript)만이 type check를 통과합니다.
- type추론
    - 변수의 type을 알려 주지 않아도 typescript는 초깃값으로부터 type을 추론합니다.
- type 구문 없이도 오류를 잡을 수 있지만, type 구문을 추가한다면 더 많은 오류를 찾아낼 수 있다.
- typescript의 type system은 javascript의 런타임 동작을 ‘모델링’합니다.

### typescript의 목표

- 런타임에 오류를 발생시킬 코드를 Build 과정에서 미리 찾아내는 것 입니다.
    - typescript가 ‘정적’ type system인 이유

### 요약

- typescript는 javascript의 상위집합입니다.
    - 모든 javascript 프로그램은 이미 typescript 프로그램입니다.
    - typescript는 별도의 문법을 가지고 있기 때문에 일반적으로는 유효한 javascript 프로그램이 아닙니다.
- typescript는 javascript 런타임 동작을 모델링하는 type system을 가지고있습니다.
    - 런타임 오류를 발생시키는 코드를 찾아내려고 합니다.
    - 그러나 모든 오류를 찾아내리는 것을 기대할 수 없습니다.
    - type checker를 통과하면서도 런타임 오류를 발생시키는 코드는 존재할 수 있습니다.
- typescript의 type system은 전반적으로 javascript 동작을 모델링합니다.
    - 잘못된 매개변수 개수로 함수를 호출하는 경우처럼, javascript에서는 허용되지만 typescript에서는 문제가 되는 경우도 있습니다.
    - 문법적 엄격함은 온전히 취향의 차이이며 우열을 가릴 수 없는 문제입니다.
<br>

## Item 2. typescript 설정 이해하기

### typescript의 설정

- 소스 파일 include, 어떤 종류의 출력을 생성할 지 제어하는 등 상세한 정보를 정의할 수 있습니다.
- Command Line에서 할당하거나 tsconfig.json 파일로 설정할 수 있습니다.
    - ex) `$ tsc —noImplicitAny program.ts`

    ```
    // tsconfig.json
    {
      "compilerOptions":{
        "noImplicitAny":true,
        "strictNullChecks": true
      }
    }
    
    ```


### typescript의 설정법

- noImplicitAny
    - 변수들이 미리 정의된 type을 가져야 하는지 여부를 제어합니다.
        - 즉, 코드를 작성할 때마다 type을 명시하도록 해야 합니다.
    - type을 할당하지 않으면 `암시적 any` type으로 할당됩니다.
        - `암시적 any` type을 할당하려고 할 때 에러가 발생합니다.
    - javascript로 되어있는 기존 프로젝트를 typescript로 전환하는 상황에만 필요합니다.
- strictNullChecks
    - null과 undefined가 모든 type에서 허용되는지 확인하는 설정입니다.
    - null과 undefined 관련된 오류를 잡아 내는 데 많은 도움이 되지만, 코드 작성을 어렵게 합니다.

### 요약

- typescript 컴파일러는 언어의 핵심 요소에 영향을 미치는 몇 가지 설정을 포함하고 있습니다.
- typescript 설정은 Command Line을 이용하기보다는 tsconfig.json을 사용하는 것이 좋습니다.
- javascript 프로젝트를 typescript로 전환하는 게 아니라면 noImplicitAny를 설정하는 것이 좋습니다.
- “undefined는 객체가 아닙니다” 같은 런타임 오류를 방지하기 위해 strictNullChecks를 설정하는 것이 좋습니다.
- typescript에서 엄격한 체크를 하고 싶다면 strict 설정을 고려해야 합니다.
<br>

## Item 3. 코드 생성과 type이 관계없음을 이해하기

### typescript 컴파일러의 역할

- 최신 typescript / javascript를 브라우저에서 동작할 수 있도록 구버전의 javascript로 트랜스파일(transpile)합니다.
- 코드의 type 오류를 체크합니다.

### type 오류가 있는 코드도 컴파일이 가능하다.

- 컴파일은 type check와 독립적으로 동작하기 때문에, type 오류가 있는 코드도 컴파일이 가능하다.
    - C, Java의 경우 type check와 컴파일이 동시에 이루어진다.
- type 오류가 있더라도 컴파일된 산출물이 나오는 것은 문제가 된 오류를 수정하지 않더라도 Application의 다른 부분을 테스트할 수 있어 효율적이다.
- 오류발생 시 컴파일하지 않으려면 `tsconfig.json`에 `noEmitOnError`를 설정해 해결할 수 있다.

### 런타임에는 type check가 불가능하다.

- typescript의 type은 ‘제거 가능(erasable)’합니다.
    - javascript로 컴파일되는 과정에서 모든 인터페이스, type type 구문은 제거된다.
- type정보를 유지하는 방법
    1. 내부 속성이 존재하는지 체크해 보는 것
        - 속성 체크는 런타임에 접근 가능한 값에만 사용할 수 있지만, type checker 역시도 type을 동일하게 보정한다.
    2. 런타임에 접근 가능한 type 정보를 명시적으로 저장하는 ‘태그’기법
        - 런타임에 type 정보를 손쉽게 유지할 수 있기 때문에, 자주 사용하는 기법
    3. type(런타임 접근 불가)과 값(런타임 접근 가능)을 둘 다 사용하는 기법
        - type을 Class로 만들어서 해결합니다.
        - 인터페이스는 type으로만 사용 가능하지만, Class로 선언하면 type과 값을 모두 사용할 수 있습니다.

### type 연산은 런타임에 영향을 주지 않습니다.

- 값을 정제하기 위해서는 런타임의 type을 체크하고, javascript를 통해 변환을 수행해야 한다.

    ```
    function asNumber(val: number | string): number {
      return typeof(val) === 'string' ? Number(val) : val;
    }    
    ```


### 런타임 type은 선언된 type과 다를 수 있다.

- typescript는 실행되지 못하는 죽은(dead) 코드를 찾아낼 수 있지만, 완벽하진 않다.
    - API를 잘못 파악하여 반환된 값이 정의한 type과 다른 경우도 발생한다.
- type이 달라지는 상황을 가능한 한 피해야 한다.
- 선언된 type이 언제든지 달라질 수 있다는 것을 명시해야 한다.

### typescript의 type으로는 함수를 오버로드할 수 없다.

- typescript에서는 type과 런타임의 동작이 무관하기 때문에 오버로딩은 불가능하다.
    - 함수 오버로딩 기능을 지원하기는 하지만, type 수준에서만 동작한다.
    - 한 함수에 대해 여러 개의 선언문을 작성할 수 있지만, 구현체는 오직 하나뿐이다.

    ```tsx
    // typescript
    function add(a: number, b:number): number { return a + b; }
    function add(a: string, b:string): string { return a + b; }
    
    >> Build
    
    // javascript
    function add(a, b){ return a + b; }
    ```


### typescript의 type은 런타임 성능에 영향을 주지 않는다.

- typescript는 ‘런타임’ 오버헤드가 없는 대신, ‘Build Time’ 오버헤드가 존재한다.
    - 오버헤드가 커지면, 빌드 도구에서 ‘`transpile only`’를 설정하여 type check를 무시할 수 있다.
- typescript가 컴파일하는 코드는 아래와 같은 문제에 맞닥뜨릴 수 있다.
    - 오래된 런타임 환경을 지원하기 위해 호환성을 높이고 성능 오버헤드를 감안할지
    - 호환성을 포기하고 성능 중심의 네이티브 구현체를 선택할지
    - 어떤 경우든지 호환성과 성능 사이의 선택은 컴파일 타깃과 언어레벨의 문제이다.
        - 즉, type과는 무관하다.

### 요약

- 코드 생성은 type system과 무관하다.
    - typescript의 type은 런타임 동작이나 성능에 영향을 주지 않는다.
- type 오류가 존재하더라도 코드 생성(컴파일)은 가능하다.
- typescript의 type은 런타임에 사용할 수 없다.
    - 런타임에 type을 지정하려면 아래와 같은 별도의 방법이 필요하다.
        1. 태그된 유니온과 속성 체크 방법
        2. 클래스 같이 typescript의 type과 런타임 값, 둘 다 제공하는 방법
<br>

## Item 4. 구조적 타이핑에 익숙해지기

### javascript는 duck typing 기반이다.

- duck typing
    - 객체가 어떤 type에 부합하는 변수와 메서드를 가질 때 객체를 해당 type에 속하는 것으로 간주하는 방식

### 구조적 타이핑

- typescript의 type system은 javascript의 런타임 동작을 모델링한다.
- 함수의 매개변수 값이 모두 제대로 주어진다면, 그 값이 어떻게 만들어졌는지 신경 쓰지 않고 사용한다.
    - 즉, 매개변수 값이 요구사항을 만족한다면 type이 무엇이든 모델링 할 수 있다.
- ‘봉인된 (sealed)’ or ‘정확한 (precise)’type
    - 호출에 사용되는 매개변수의 속성들이 type에 선언된 속성만 가질 것이라 생각하기 쉽다.
    - typescript의 type system에서는 표현할 수 없다.
    - typescript의 type은 열려(open) 있다.
        - type에 선언된 속성 외에 임의의 속성을 추가하더라도 오류가 발생하지 않는다.
- 라이브러리 간의 의존성을 완벽하게 분리할 수 있도록 도와준다.
- 구조적 타이핑을 활용하여 더 구체적인 인터페이스를 정의하는게 효율적이다.

### 요약

- javascript가 덕 타이핑(duck typing) 기반이고, typescript가 이를 모델링하기 위해 구조적 타이핑을 사용한다.
    - 인터페이스에 할당 가능한 값이라면 type 선언에 명시적으로 나열된 속성들을 가져야한다.
        - type은 따로 ‘봉인’되어 있지 않다.
- 클래스 역시 구조적 타이핑 규칙을 따른다.
    - 클래스의 인스턴스가 예쌍과 다를 수 있다.
- 구조적 타이핑을 사용하면 유닛 테스팅을 손쉽게 할 수 있다.
<br>

## Item 5. any type 지양하기

### typescript의 type system은 점진적(gradual)이고 선택적(optional)이다.

- 코드에 type을 조금씩 추가할 수 있기 때문에 점진적
- 언제든지 type checker를 해제할 수 있기 때문에 선택적
- 이 기능들의 핵심은 any type이다.

### any type에는 type 안전성이 없습니다.

- as any를 사용하면 어떤 type이든 할당할 수 있게 된다.
- 타임 체커는 선언에 따라 초기화시 선언한 type으로 판단하여 혼돈은 커지게 된다.

### any는 함수 contract를 무시해버립니다.

- 함수를 호출하는 쪽은 약속된 type의 입력을 제공하고, 약속된 type의 출력을 반환해야한다.
    - any type을 사용하면 이런 약속을 어길 수 있다.

### any type에는 언어 서비스가 적용되지 않는다.

- 어떤 심볼에 type이 있다면 typescript는 자동완성 기능과 적절한 도움말을 제공한다.
    - 그러나 any type인 심볼을 사용하면 아무런 도움을 받지 못한다.

### any type은 코드 리팩터링 때 버그를 감춥니다.

- any 매개변수를 받을 때, 컴포넌트가 변경될 경우 에러가 발생하지 않는다.
    - 그로인해 컴파일에서 에러가 발생하지않고, 런타임에서 에러가 발생한다.
    - any가 아니라 구체적인 type을 사용했다면, type checker가 오류를 발견했을 것이다.

### any는 type 설계를 감춰버린다.

- any는 상태 객체의 설계를 감춰버리기 때문에 문제가 발생한다.
- 깔끔하고 정확하고 명료한 코드 작성을 위해 제대로된 type 설계는 필수이다.
- any type을 사용하면 type 설계가 불분명해진다.
    - 설계가 잘 되었는지, 설계가 어떻게 되어 있는지 알 수 없다.
    - 코드 리뷰를 진행할 때, Application의 상태를 어떻게 변경했는지 재구성해야한다.

### any는 type system의 신뢰도를 떨어뜨린다.

- typescript는 컴파일에 type checker가 실수를 잡아주어 코드의 신뢰도가 높아집니다.
    - 그러나 런타임에 type 오류를 발견하게 된다면 type checker를 신뢰할 수 없어진다.
- any type을 사용하지 않으면 런타임에 발견될 오류를 미리 잡을 수 있고, 신뢰도를 높일 수 있다.

### 요약

- any type을 사용하면 type checker와 typescript 언어 서비스를 무력화시켜버린다.
- any type은 진짜 문제점을 감추며, 개발 경험을 나쁘게 하고, type system의 신뢰도를 떨어뜨린다.
