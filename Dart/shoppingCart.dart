abstract class PrintHelper {
  printInfo() => print(getInfo());
  printGoodsInfo() => print(getGoodsInfo());
  getInfo();
  getGoodsInfo();
}

class Meta {
  String name;
  double price;
  Meta(this.name, this.price);
}

class Item extends Meta {
  int count = 0;
  Item(name, price)
      : count = 1,
        super(name, price);
  Item operator +(Item item) => Item(name + item.name, price + item.price);
}

class ShoppingCart extends Meta with PrintHelper {
  DateTime date;
  String code;
  List<Item> _bookings;

  double get price => _bookings.reduce((v, e) => v + e).price;
  int get count {
    int r = 0;
    _bookings.forEach((item) {
      r += item.count;
    });
    return r;
  }

  ShoppingCart({name}) : this.withCode(name: name, code: null);
  ShoppingCart.withCode({name, this.code})
      : _bookings = [],
        date = DateTime.now(),
        super(name, 0.0);

  add(Item item) {
    for (Item v in _bookings) {
      if (v.name == item.name) {
        v.count++;
        return;
      }
    }
    _bookings.add(item);
  }

  getGoodsInfo() {
    String s = '小票信息:\n';
    _bookings.forEach((item) {
      s += '名称:${item.name}, 单价:${item.price}, 数量: ${item.count}\n';
    });
    return s;
  }

  getInfo() => '''
购物车信息:
-----------------------------
用户名: $name
优惠码: ${code ?? '没有'}
总价: $price
总数: $count
日期: $date
-----------------------------
''';
}

void main() {
  ShoppingCart.withCode(name: '张三', code: '123456')
    ..add(Item('苹果', 10.0))
    ..add(Item('鸭梨', 20.0))
    ..add(Item('苹果', 10.0))
    ..printInfo()
    ..printGoodsInfo();

  ShoppingCart(name: '李四')
    ..add(Item('香蕉', 15.0))
    ..add(Item('西瓜', 40.0))
    ..printInfo()
    ..printGoodsInfo();
}
