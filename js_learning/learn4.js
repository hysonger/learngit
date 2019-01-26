// 面向对象（OOP）部分开始！奇葩的原型链

function Living(name, age, sexual){ // 能生成对象的构造函数！
    this.name = name || "Noname";
    this.age = age || 0;
    this.sexual = sexual || "nosex";
}

function People(name, age, sexual, ...personality){
    Living.call(this, name, age, sexual); // 调用继承的对象的构造函数进行初始化
    this.personality = personality || [];
}

function F(){}

Living.prototype.grow = function(){
    this.age++;
    console.log(`${this.name}(${this.age}, ${this.sexual}) has grown up.`);
}

Living.prototype.changeSexual = function(newSexual){ // I am so evil:D
    var oldSexual = this.sexual;
    this.sexual = newSexual;
    console.log(`${this.name}(${this.age}) has been changed sexual from a ${oldSexual} to a ${newSexual}.`)
}

// People.prototype = Living.prototype;
// 错了！错了！不要这么写！这样的话People和Living的原型完全一样了，那干嘛要两个构造函数？

// People.prototype = new Living(); // 不中转的方式，将People构造函数的原型绑定到一个新的Living对象上
// 这种情况下，Living生成的对象中所有属性，包括来自Living.prototype（表现为(new Living()).__proto__）
// 的公共属性，和new Living()这个新对象自己的独有属性（在构造函数执行的时候添加）。
// 而后者可能我们并不希望引入到People.prototype中，我们继承Living一般来说只想要它的公共属性，
// 而公共属性是决定它这一类对象的本质。

// 所以，我们还可以使用一个空函数中转
F.prototype = Living.prototype; // 让空函数拥有Living.prototype，保留下来Living最精华的”本质“
People.prototype = new F(); // 再让People通过new F()继承这部分”本质“（生成的Living对象全部共有共用的元素）
// 剔除掉Living对象的其他可变属性（也就是生成的Living对象各自拥有的内容不同的元素）
// F是空函数，因此是干净的，所以就可以实现这样的”剔除“。
People.prototype.constructor = People; // 无论哪种方式，都不要忘了修复构造函数的指向，因为你直接修改过prototype

// 然后可以继续定义People.prototype里面的共用元素
People.prototype.say = function(text){ // 定义在构造函数的prototype里面的东西会被由该构造函数生成的所有对象共享
    console.log(`${this.name}(${this.age}, ${this.sexual}):`, text);
}; // 说话这事人人都一样，就不需要每人都来一份了，都用一样的就好
People.prototype.kind = "people";
// 由构造函数生成对象时，prototype会成为所有新对象的__proto__，所有新对象都会共同拥有prototype里面的元素
// 本质：People.prototype === alice.__proto__ === bob.__proto__

var alice = new People("Alice", 20, "girl");
var jesse = new People("Jesse", 21, "boy");

alice.say("Hello!");
jesse.say("Hi~");
setTimeout(() => {alice.grow.call(alice)}, 1000); // 如果要延时执行，this会指向出错。
// 只有弄一个匿名的箭头函数负责正确调用grow，再把这个箭头函数交给setTimeout来解决问题了……
setTimeout(() => {jesse.grow.call(jesse)}, 1000);
alice.say("You have grown up, huh~"); // 注意这里执行的时候，两人的grow还要等一秒才执行
jesse.say("No, I haven't."); // 所以两人此时根本没有长大

jesse.changeSexual("girl");
alice.say("What happened???");
jesse.say("Look at me! I am a girl now.");
alice.say("...");

if(alice instanceof People && alice instanceof Living){ // 验证继承关系
    console.log("Alice is a people, and also a living creature.")
}