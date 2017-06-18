# 介绍 #

----------


## Vue.js 是什么 ##

Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的**渐进式框架**。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与
<font color=#00f11f size=3>单文件组件</font>
和 <font color=#00f11f size=3>Vue 生态系统支持的库</font>
结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

## 起步 ##

> 官方指南假设你已有 HTML、CSS 和 JavaScript 中级前端知识。如果你刚开始学习前端开发，将框架作为你的第一步可能不是最好的主意——掌握好基础知识再来！之前有其他框架的使用经验对于学习 Vue.js 是有帮助的，但这不是必需的。

尝试 Vue.js 最简单的方法是使用 [JSFiddle Hello World 例子](https://jsfiddle.net/chrisvfritz/50wL7mdz/)。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。或者你也可以创建一个本地的 .html 文件，然后通过如下方式引入 Vue：

    <script src="https://unpkg.com/vue/dist/vue.js"></script>

你可以查看[安装教程](https://cn.vuejs.org/v2/guide/installation.html)来了解其他安装 Vue 的选项。


## 声明式渲染  ##

Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM：

    <div id="app">
      {{ message }}
    </div>
    var app = new Vue({
      el: '#app',
      data: {
    message: 'Hello Vue!'
      }
    })

Hello Vue!

我们已经生成了我们的第一个 Vue 应用！看起来这跟单单渲染一个字符串模板非常类似，但是 Vue 在背后做了大量工作。现在数据和 DOM 已经被绑定在一起，所有的元素都是**响应式的**。我们如何知道？打开你的浏览器的控制台（就在这个页面打开），并修改 app.message，你将看到上例相应地更新。
除了文本插值，我们还可以采用这样的方式绑定 DOM 元素属性：

    <div id="app-2">
      <span v-bind:title="message">
    鼠标悬停几秒钟查看此处动态绑定的提示信息！
      </span>
    </div>
    var app2 = new Vue({
      el: '#app-2',
      data: {
    message: '页面加载于 ' + new Date()
      }
    })

> 鼠标悬停几秒钟查看此处动态绑定的提示信息！

这里我们遇到点新东西。你看到的` v-bind` 属性被称为指令。指令带有前缀` v-`，以表示它们是 Vue 提供的特殊属性。可能你已经猜到了，它们会在渲染的 DOM 上应用特殊的响应式行为。简言之，这里该指令的作用是：“将这个元素节点的` title` 属性和 Vue 实例的 `message` 属性保持一致”。

再次打开浏览器的 JavaScript 控制台输入` app2.message = '新消息'`，就会再一次看到这个绑定了 `title` 属性的 HTML 已经进行了更新。

##条件与循环##

控制切换一个元素的显示也相当简单：

    <div id="app-3">
      <p v-if="seen">现在你看到我了</p>
    </div>
    var app3 = new Vue({
      el: '#app-3',
      data: {
    seen: true
      }
    })
  
>   现在你看到我了

继续在控制台设置` app3.seen = false`，你会发现 “现在你看到我了” 消失了。
这个例子演示了我们不仅可以绑定 DOM 文本到数据，也可以绑定 DOM 结构到数据。而且，Vue 也提供一个强大的过渡效果系统，可以在 Vue 插入/更新/删除元素时自动应用过[渡效果。](https://cn.vuejs.org/v2/guide/transitions.html)

还有其它很多指令，每个都有特殊的功能。例如，`v-for` 指令可以绑定数组的数据来渲染一个项目列表：

    <div id="app-4">
      <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
      </ol>
    </div>
    var app4 = new Vue({
      el: '#app-4',
      data: {
    todos: [
      { text: '学习 JavaScript' },
      { text: '学习 Vue' },
      { text: '整个牛项目' }
    ]
      }
    })

> 学习 JavaScript

> 学习 Vue

> 整个牛项目

在控制台里，输入 `app4.todos.push({ text: '新项目' })`，你会发现列表中添加了一个新项。

## 处理用户输入  ##

为了让用户和你的应用进行互动，我们可以用 `v-on` 指令绑定一个事件监听器，通过它调用我们 Vue 实例中定义的方法：

    <div id="app-5">
      <p>{{ message }}</p>
      <button v-on:click="reverseMessage">逆转消息</button>
    </div>
    var app5 = new Vue({
      el: '#app-5',
      data: {
    message: 'Hello Vue.js!'
      },
      methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
      }
    })
    
   >  Hello Vue.js!
   
   >  逆转消息

注意在 `reversemessage` 方法中，我们更新了应用的状态，但没有触碰 DOM——所有的 DOM 操作都由 Vue 来处理，你编写的代码只需要关注底层逻辑。
Vue 还提供了 `v-model` 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

    <div id="app-6">
      <p>{{ message }}</p>
      <input v-model="message">
    </div>
    var app6 = new Vue({
      el: '#app-6',
      data: {
    message: 'Hello Vue!'
      }
    })

> Hello Vue!
> 
> Hello Vue!

## 组件化应用构建 ## 


组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、自包含和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树：
Component Tree

在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例，在 Vue 中注册组件很简单：
    
    // 定义名为 todo-item 的新组件
    Vue.component('todo-item', {
      template: '<li>这是个待办项</li>'
    })

现在你可以用它构建另一个组件模板：

    <ol>
      <!-- 创建一个 todo-item 组件的实例 -->
      <todo-item></todo-item>
    </ol>

但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷，我们应该能将数据从父作用域传到子组件。让我们来修改一下组件的定义，使之能够接受一个**属性**：

    Vue.component('todo-item', {
      // todo-item 组件现在接受一个
      // "prop"，类似于一个自定义属性
      // 这个属性名为 todo。
      props: ['todo'],
      template: '<li>{{ todo.text }}</li>'
    })

现在，我们可以使用 `v-bind` 指令将待办项传到每一个重复的组件中：

    <div id="app-7">
      <ol>
    <!-- 现在我们为每个todo-item提供待办项对象-->
    <!-- 待办项对象是变量，即其内容可以是动态的 -->
    <todo-item v-for="item in groceryList" v-bind:todo="item"></todo-item>
      </ol>
    </div>
    Vue.component('todo-item', {
      props: ['todo'],
      template: '<li>{{ todo.text }}</li>'
    })
    var app7 = new Vue({
      el: '#app-7',
      data: {
    groceryList: [
      { text: '蔬菜' },
      { text: '奶酪' },
      { text: '随便其他什么人吃的东西' }
    ]
      }
    })

> 蔬菜
> 
> 奶酪
> 
> 随便其他什么人吃的东西

这只是一个假设的例子，但是我们已经设法将应用分割成了两个更小的单元，子单元通过 `props` 接口实现了与父单元很好的解耦。我们现在可以进一步为我们的 `todo-item` 组件实现更复杂的模板和逻辑的改进，而不会影响到父单元。
在一个大型应用中，有必要将整个应用程序划分为组件，以使开发可管理。在后续教程中我们将详述组件，不过这里有一个（假想的）使用了组件的应用模板是什么样的例子：

    <div id="app">
      <app-nav></app-nav>
      <app-view>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
      </app-view>
    </div>

## 与自定义元素的关系 ##

你可能已经注意到 Vue 组件非常类似于**自定义元素**——它是 [Web 组件规范](https://www.w3.org/wiki/WebComponents/)的一部分，这是因为 Vue 的组件语法部分参考了该规范。例如 Vue 组件实现了 `Slot API` 与 `is` 特性。但是，还是有几个关键差别：

1. Web 组件规范仍然处于草案阶段，并且尚无浏览器原生实现。相比之下，Vue 组件不需要任何补丁，并且在所有支持的浏览器（IE9 及更高版本）之下表现一致。必要时，Vue 组件也可以包装于原生自定义元素之内。

2. Vue 组件提供了纯自定义元素所不具备的一些重要功能，最突出的是跨组件数据流，自定义事件通信以及构建工具集

# Vue 实例 #

## 构造器 ##

每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue **的根实例** 启动的：

    var vm = new Vue({
      // 选项
    })

虽然没有完全遵循 [MVVM 模式](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)， Vue 的设计无疑受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的简称) 这个变量名表示 Vue 实例。
在实例化 Vue 时，需要传入一个**选项对象**，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。全部的选项可以在 [API 文档](https://cn.vuejs.org/v2/api/)中查看。

可以扩展 `Vue` 构造器，从而用预定义选项创建可复用的**组件构造器**：

    var MyComponent = Vue.extend({
      // 扩展选项
    })
    // 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
    var myComponentInstance = new MyComponent()

尽管可以命令式地创建扩展实例，不过在多数情况下建议将组件构造器注册为一个自定义元素，然后声明式地用在模板中。我们将在后面详细说明组件系统。现在你只需知道所有的 Vue.js 组件其实都是被扩展的 Vue 实例。

## 属性与方法 ##

每个 Vue 实例都会代理其 `data` 对象里所有的属性：

    var data = { a: 1 }
    var vm = new Vue({
      data: data
    })
    vm.a === data.a // -> true
    // 设置属性也会影响到原始数据
    vm.a = 2
    data.a // -> 2
    // ... 反之亦然
    data.a = 3
    vm.a // -> 3

注意只有这些被代理的属性是**响应的**。如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。我们将在后面详细讨论响应系统。
除了 data 属性， Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分。例如：
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})
vm.$data === data // -> true
vm.$el === document.getElementById('example') // -> true
// $watch 是一个实例方法
vm.$watch('a', function (newVal, oldVal) {
  // 这个回调将在 `vm.a`  改变后调用
})


> 注意，不要在实例属性或者回调函数中（如` vm.$watch('a', newVal =this.myMethod())`）使用箭头函数。因为**箭头函数**绑定父上下文，所以 **this** 不会像预想的一样是 Vue 实例，而是 `this.myMethod` 未被定义。

实例属性和方法的完整列表中查阅 [API 参考](https://cn.vuejs.org/v2/api/)。

## 实例生命周期 ##

每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如，实例需要配置数据观测(data observer)、编译模版、挂载实例到 DOM ，然后在数据变化时更新 DOM 。在这个过程中，实例也会调用一些 **生命周期钩子** ，这就给我们提供了执行自定义逻辑的机会。例如，created 这个钩子在实例被创建之后被调用：

    var vm = new Vue({
      data: {
    a: 1
      },
      created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
      }
    })
    // -> "a is: 1"

也有一些其它的钩子，在实例生命周期的不同阶段调用，如 `mounted、 updated 、destroyed` 。钩子的 `this` 指向调用它的 Vue 实例。一些用户可能会问 Vue.js 是否有“控制器”的概念？答案是，没有。组件的自定义逻辑可以分布在这些钩子中。

> 原文： [http://vuejs.org/guide/instance.html](http://vuejs.org/guide/instance.html)