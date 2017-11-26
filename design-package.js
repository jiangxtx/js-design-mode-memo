var Book = function (id, name, price) {
    var num = 1; // 私有属性

    // 私有方法
    function checkId(id) {
        console.log('checkId func: ' + id)
    }

    // public props
    this.id = id;
    this.name = name;
    this.price = price;

    this.doublePrice = function () {
        return +price * 2;
    }

    // 构造器
    this.setPrice = function (newPrice) {
        this.price = newPrice;
        return this;
    }
}

// 静态类公有属性（对象不能访问）
Book.isPublished = false;

// 静态类公有方法（对象不能访问）
Book.changeVersion = function () {
    console.log('changeVersion func....')
}


Book.prototype = {
    // 公有属性与方法
    isChinese: true,
    showPrice: function () {
        return this.price || '-1';
    }
}


////////////////// 测试代码 ////////////////////////

var book1 = new Book(1, 'JavaScript 指南', 15.00);
console.log(book1.num)
console.log(book1.name)
console.log(book1.isPublished)
console.log(book1.isChinese)
console.log(book1.chechId(1))
console.log(book1.showPrice())
console.log(book1.changeVersion())

