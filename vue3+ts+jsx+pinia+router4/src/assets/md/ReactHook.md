---
title: My Cool App
meta:
  - name: description
    content: Hello World
---

# React

[react](https://reactjs.org/docs/hello-world.html)

[react新文档](https://beta.reactjs.org/)

### 01-react用法

#### 1. 状态，更新

[React counter++](https://codesandbox.io/s/gallant-borg-cos0o?file=/src/counter.js)

#### 2. JSX本质 

本质是一个语法糖。不用JSX同样可以写React组件。

 特点： 1.  JSX表达能力 = JS表达能力

​			 2.  可以更熟练掌握JS

```jsx
React.createElement(
  "div",
  null,
  React.createElement(
    "button",
    {
      onClick: function onClick() {
        return setCount(count + 1);
      }
    },
    React.createElement(CounterLabel, { count: count })
  )
);
```

**异步请求**

编写异步请求需要思考的场景问题： 1. 数据状态 2. Loading 的状态 3. 请求出错的处理

```text
在react中，任何一个state改变， 整个函数组件其实是被完全执行一遍的，而且除了 state，多次的执行之间没有任何关系。首先考虑这个组件有哪些状态（state），这些状态的变化是由什么触发的。useCallBack的hook缓存回调函数。异步函数重用，使用Redux在进行全局状态管理。
```

[异步场景](https://codesandbox.io/s/gallant-borg-cos0o?file=/src/01-counterAdd/UserList.js)

### 02-理解React

#### 1. 模型

<img src="https://static001.geekbang.org/resource/image/a2/5b/a29c89ffd7c2ce101183407fe7d90e5b.png" style="zoom:50%;" />

我们可以把 UI 的展现看成一个函数的执行过程。其中，**Model 是输入参数**，函数的执行结果是 DOM 树，也就是 View。而 React 要保证的，就是**每当 Model 发生变化时，函数会重新执行，并且生成新的 DOM 树**，然后 React 再把新的 DOM 树以**最优**的方式更新到浏览器。

![](/Users/hzy/Downloads/OneDrive - Business/笔记/reactHook/img/01-react执行-自绘.png)

#### 2. 使用class组件比较牵强的两大原因

**一方面**，React 组件之间是不会互相继承的。比如说，你不会创建一个 Button 组件，然后再创建一个 DropdownButton 来继承 Button。所以说，React 中其实是没有利用到 Class 的继承特性的。

**另一方面，**因为所有 UI 都是由状态驱动的，因此很少会在外部去调用一个类实例（即组件）的方法。要知道，组件的所有方法都是在内部调用，或者作为生命周期方法被自动调用的。

**函数组件的缺点**： 只是当时有一个局限是，函数组件无法存在内部状态，必须是纯函数，而且也无法提供完整的生命周期机制。这就极大限制了函数组件的大规模使用。

#### 3.Hooks的诞生

1. 能够把**一个外部的数据绑定到函数的执行**。当**数据变化**时，**函数能够自动重新执行**。这样的话，任何会影响 UI 展现的外部数据，都可以通过这个机制绑定到 React 的函数组件。

2. Hooks理念： **在 React 中，Hooks 就是把某个目标结果钩到某个可能会变化的数据源或者事件源上，那么当被钩到的数据或事件发生变化时，产生这个目标结果的代码会重新执行，产生更新后的结果。** 
3. Hooks 中被钩的对象，不仅可以是某个独立的数据源，也可以是另一个 Hook 执行的结果，这就带来了 Hooks 的最大好处：**逻辑的复用**

![Hooks理念](https://static001.geekbang.org/resource/image/f7/1d/f764a904bba8836597e441884804b41d.png)

4. 代码是**从技术角度组织在一起的**，例如在 componentDidMount 中都去做一些初始化的事情。而在函数组件中，**代码是从业务角度组织在一起的**，相关代码能够出现在集中的地方

<img src="https://static001.geekbang.org/resource/image/f8/d5/f8a255ca1ec737a8ff5a40160e789fd5.png" style="zoom:100%;" />

### 03-内置Hooks

- seState、useEffect、useCallback、useMemo、useRef、useContext

#### 1. useState

- 第一个数组元素用来读取 state 的值，第二个则是用来设置这个 state 的值
- state只读，我们通过第二个数组元素setCount来设置他的值

``` jsx
// 定义一个年龄的 state，初始值是 42
const [age, setAge] = useState(42);
// 定义一个水果的 state，初始值是 banana
const [fruit, setFruit] = useState('banana');
// 定一个一个数组 state，初始值是包含一个 todo 的数组
const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```

- 思考：什么样的值需要存在state中

  - **原则**

    ```text
    遵循的一个原则就是：state 中永远不要保存可以通过计算得到的值
    
    example
    
    从 props 传递过来的值。有时候 props 传递过来的值无法直接使用，而是要通过一定的计算后再在 UI 上展示，比如说排序。那么我们要做的就是每次用的时候，都重新排序一下，或者利用某些 cache 机制，而不是将结果直接放到 state 里。
    
    从 URL 中读到的值。比如有时需要读取 URL 中的参数，把它作为组件的一部分状态。那么我们可以在每次需要用的时候从 URL 中读取，而不是读出来直接放到 state 里。
    
    从 cookie、localStorage 中读取的值。通常来说，也是每次要用的时候直接去读取，而不是读出来后放到 state 里。
    ```

- state缺点

  - 一旦组件有自己状态，意味着组件如果重新创建，就需要有恢复状态的过程，这通常会让组件变得更复杂。

    - ```text
      比如一个组件想在服务器端请求获取一个用户列表并显示，如果把读取到的数据放到本地的 state 里，那么每个用到这个组件的地方，就都需要重新获取一遍。
      ```

#### 2.useEffect

作用： **useEffect ，顾名思义，用于执行一段副作用。**

什么是副作用呢？通常来说，副作用是指一段和当前执行结果无关的代码。比如说要修改函数外部的某个变量，要发起一个请求，等等。也就是说，在函数组件的当次执行过程中，useEffect 中代码的执行是不影响渲染出来的 UI 的。

```jsx
useEffect(callback, dependencies)

1. 依赖项
[]执行一次，
正常传，数据变化执行 ，
不传则每次render以后都执行

useEffect 四种执行时机 - 写法

每次 render 后执行：不提供第二个依赖项参数。比如useEffect(() => {})。

仅第一次 render 后执行：提供一个空数组作为依赖项。比如useEffect(() => {}, [])。

第一次以及依赖项发生变化后执行：提供依赖项数组。比如useEffect(() => {}, [deps])。

组件 unmount 后执行：返回一个回调函数。比如useEffect() => { return () => {} }, [])。
```

useEffect **还允许你返回一个函数，用于在组件销毁的时候做一些清理的操作**。比如移除事件的监听。

**Hook作用** ： Hooks 提供了让你监听某个数据变化的能力。这个变化可能会触发组件的刷新，也可能是去创建一个副作用，又或者是刷新一个缓存。

**Hooks三点注意项**： 1. 依赖项定义的变量一定要在回调函数中用到。 2. 依赖是常量数组，不能是变量 3. **React进行浅比较是否发生变化，注意不要每次都创建一个新的对象，**这样React也会以为你的数据发生改变。

```js
function Sample() {
  // 这里在每次组件执行时创建了一个新数组 
  const todos = [{ text: 'Learn hooks.'}]; 
  useEffect(() => { 
    console.log('Todos changed.'); 
  }, [todos]);
}
```

#### 3. Hooks使用规则

1. 只能在函数组件的**顶级作用域**使用

   1. 不能在**条件语句、循环或者嵌套函数中**执行，也不能出现在**renturn**之后

      ```jsx
      function MyComp() { 
        const [count, setCount] = useState(0); 
        if (count > 10) { 
          // 错误：不能将 Hook 用在条件判断里 
          useEffect(() => { // ... },[count])
        }
      ```

      

   2. 在组件多次渲染之间，按照顺序被执行

2. 只能在**函数组件**或者其他**Hook中**使用

   - 在函数组件中用，那么封装高阶组件将返回值，使用props给Class组件。

3. eslint纠正hook使用

```js
npm install eslint-plugin-react-hooks --save-dev

./eslint
{ "plugins": 
	[ // ... "react-hooks" ], 
	"rules": {
  	// ... 
  	// 检查 Hooks 的使用规则 
  	"react-hooks/rules-of-hooks": "error", 
  	// 检查依赖项的声明 
  	"react-hooks/exhaustive-deps": "warn" 
  	}
}
```

### 04-缓存

#### 1. useCallback： 缓存函数

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount(count + 1);
  // ...
  return <button onClick={handleIncrement}>+</button>
}
```

- 函数组件并没有一个直接的方式在多次渲染之间维持一个状态。
- 每次组件状态发生变化的时候，函数组件实际上都会重新执行一遍。在每次执行的时候，实际上都会创建一个新的事件处理函数 handleIncrement。
- **实际上都创建一个新的函数，不会影响结果，但是这样不是很好。**
- 我们要考虑的，即使 count 没有发生变化，但是函数组件因为其它状态发生变化而重新渲染时，这种写法也会每次创建一个新的函数。
- 如果每次都是一个新的，那么这个 React 就会认为这个组件的 props 发生了变化，从而必须重新渲染。因此，我们需要做到的是：**只有当 count 发生变化时，我们才需要重新定一个回调函数。**而这正是 useCallback 这个 Hook 的作用。

```jsx
useCallback(fn, deps)

这里 fn 是定义的回调函数，deps 是依赖的变量数组。只有当某个依赖变量发生变化时，才会重新声明 fn 这个回调函数。
```

- 使用useCallback性能优化

  ```jsx
  
  import React, { useState, useCallback } from 'react';
  
  function Counter() {
    const [count, setCount] = useState(0);
    const handleIncrement = useCallback(
      () => setCount(count + 1),
      [count], // 只有当 count 发生变化时，才会重新创建回调函数
    );
    // ...
    return <button onClick={handleIncrement}>+</button>
  }
  
  ```

  

#### 2. useMemo： 缓存计算的结果

```jsx
useCallback(fn, deps)


这里 fn 是定义的回调函数，deps 是依赖的变量数组。只有当某个依赖变量发生变化时，才会重新声明 fn 这个回调函数。
```

- **如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算。**

- 对于一个显示用户信息的列表，现在需要对用户名进行搜索，且 UI 上需要根据搜索关键字显示过滤后的用户： 
  - 用户列表数据本身：来自某个请求。
  - 搜索关键字：用户在搜索框输入的数据。
- 避免子组件渲染：usersToShow 这个变量，如果每次都需要重新计算来得到，那么对于 UserList 这个组件而言，就会每次都需要刷新。

```jsx

import React, { useState, useEffect } from "react";

export default function SearchUserList() {
  const [users, setUsers] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const doFetch = async () => {
      // 组件首次加载时发请求获取用户数据
      const res = await fetch("https://reqres.in/api/users/");
      setUsers(await res.json());
    };
    doFetch();
  }, []);
  let usersToShow = null;

  if (users) {
    // 无论组件为何刷新，这里一定会对数组做一次过滤的操作
    usersToShow = users.data.filter((user) =>
      user.first_name.includes(searchKey),
    );
  }

  return (
    <div>
      <input
        type="text"
        value={searchKey}
        onChange={(evt) => setSearchKey(evt.target.value)}
      />
      <ul>
        {usersToShow &&
          usersToShow.length > 0 &&
          usersToShow.map((user) => {
            return <li key={user.id}>{user.first_name}</li>;
          })}
      </ul>
    </div>
  );
}
```

使用UseMemo优化：[UseMemo优化场景](https://codesandbox.io/s/gallant-borg-cos0o?file=/src/03-CacheHooks/SearchUserList.js) 

**使用useMemo来实现useCallBack**

```jsx

 const myEventHandler = useMemo(() => {
   // 返回一个函数作为缓存结果
   return () => {
     // 在这里进行事件处理
   }
 }, [dep1, dep2]);
```

#### 3. useRef

因为函数组件不存在像Class组件那样，new一个类得到实例，然后用实例.xxx来使用属性和方法。那么React就添加了useRef，可以通过唯一的 current 属设置一个值。

```jsx
const myRefContainer = useRef(initialValue);
```

**场景**

这个组件有开始和暂停两个功能

使用 useRef 保存的数据一般是和 UI 的渲染无关的，因此当 ref 的值发生变化时，是不会触发组件的重新渲染的。



很显然，你需要用 **window.setInterval** 来提供计时功能；而为了能够暂停，你就需要在某个地方保存这个 **window.setInterval** 返回的**计数器的引用，**确保在点击暂停按钮的同时，也能用 **window.clearInterval** 停止计时器。

[计数器](https://codesandbox.io/s/gallant-borg-cos0o?file=/src/03-CacheHooks/Timer.js)



**场景**

比如说，你需要在点击某个按钮时让某个输入框获得焦点，可以通过下面的代码来实现：



```jsx

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```



#### 4. useContext：定义全局状态

React 组件之间的状态传递只有一种方式，那就是通过 props。这就意味着这种传递关系只能**在父子组件之间进行**。**如果要跨层次**，或者同层的组件之间要进行数据的共享，那应该如何去实现呢？

React 提供了 Context 这样一个机制，能够让所有在某个组件开始的组件树上创建一个 Context。这样这个组件树上的所有组件，就都能访问和修改这个 Context 了。那么在函数组件里，我们就可以使用 useContext 这样一个 Hook 来管理 Context。

```jsx
const value = useContext(MyContext);

const MyContext = React.createContext(initialValue);
```

MyContext 具有一个 Provider 的属性，一般是作为组件树的根组件。

[动态切换值](https://codesandbox.io/s/gallant-borg-cos0o?file=/src/03-CacheHooks/ThemeSwitch.js)

### 05-理解React的生命周期

#### 1. **React 的本质：从 Model 到 View 的映射**

- 引发状态发生改变的有两种情况:
  - 用户操作产生的事件，比如点击了某个按钮。
  - 副作用产生的事件，比如发起某个请求正确返回了。

对于第一种两个实现方式基本差不多，对于第二种情况，触发事件

```jsx

  class BlogView extends React.Component {
  // ...
  componentDidMount() {
    // 组件第一次加载时去获取 Blog 数据
    fetchBlog(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      // 当 Blog 的 id 发生变化时去获取博客文章
      fetchBlog(this.props.id);
    }
  }
  // ...
}
```

```jsx

function BlogView({ id }) {
  useEffect(() => {
    // 当 id 变化时重新获取博客文章
    fetchBlog(id);
  }, [id]); // 定义了依赖项 id
}
```

- 思考的问题 从class组件思考的生命周期改变 转变到了 函数组件值的改变

- 一次性执行代码

  ```jsx
  自定义Hook
  
  import { useRef } from 'react';
  
  // 创建一个自定义 Hook 用于执行一次性代码
  function useSingleton(callback) {
    // 用一个 called ref 标记 callback 是否执行过
    const called = useRef(false);
    // 如果已经执行过，则直接返回
    if (called.current) return;
    // 第一次调用时直接执行
    callBack();
    // 设置标记为已执行过
    called.current = true;
  }
  
  
  使用
  
  import useSingleton from './useSingleton';
  
  const MyComp = () => {
    // 使用自定义 Hook
    useSingleton(() => {
      console.log('这段代码只执行一次');
    });
  
    return (
      <div>My Component</div>
    );
  };
  ```

- **充分理解React的Hooks**

  - 一方面，useEffect(callback) 这个 Hook 接收的 callback，只有在依赖项变化时才被执行。而传统的 componentDidUpdate 则一定会执行。这样来看，Hook 的机制其实更具有语义化，因为过去在 componentDidUpdate 中，我们通常都需要手动判断某个状态是否发生变化，然后再执行特定的逻辑。
  - 另一方面，callback 返回的函数（一般用于清理工作）在下一次依赖项发生变化以及组件销毁之前执行，而传统的 componentWillUnmount 只在组件销毁时才会执行。

  ```jsx
  
  import React, { useEffect } from 'react';
  import comments from './comments';
  
  function BlogView({ id }) {
    const handleCommentsChange = useCallback(() => {
      // 处理评论变化的通知
    }, []);
    useEffect(() => {
      // 获取博客内容
      fetchBlog(id);
      // 监听指定 id 的博客文章的评论变化通知
      const listener = comments.addListener(id, handleCommentsChange);
      
      return () => {
        // 当 id 发生变化时，移除之前的监听
        comments.removeListener(listener);
      };
    }, [id, handleCommentsChange])
  }
  ```

### 06-Hooks典型使用场景

#### 01-自定义hooks

- 抽取业务逻辑；
- 封装通用逻辑；
- 监听浏览器状态；
- 拆分复杂组件。

```jsx

import { useState, useCallback }from 'react';
 
function useCounter() {
  // 定义 count 这个 state 用于保存当前数值
  const [count, setCount] = useState(0);
  // 实现加 1 的操作
  const increment = useCallback(() => setCount(count + 1), [count]);
  // 实现减 1 的操作
  const decrement = useCallback(() => setCount(count - 1), [count]);
  // 重置计数器
  const reset = useCallback(() => setCount(0), []);
  
  // 将业务逻辑的操作 export 出去供调用者使用
  return { count, increment, decrement, reset };
}
```

https://codesandbox.io/s/gallant-borg-cos0o?file=/src/04-UseAsyncSample/UseScroll.js
