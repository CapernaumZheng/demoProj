#### 数组
##### 1. 访问
可以任意访问其中元素，访问时间复杂度为O(1)
##### 2. 插入
平均要移动一半的元素，时间复杂度O(n)
#### 链表
<style>
.block{
    background: #85858e;
    padding: 10px;
}
.out-block {
    width: 80px;
    height:120px;
    background: #ccc;
    display: inline-block;
}
.value-block {
    width: 50px;
    height: 50px;
    background: #fff;
    margin: 15px;
    text-align:center;
}
.next-block {
    position: relative;
    width: 50px;
    background: #fff;
    margin: 15px;
    text-align:center;
}
.next-arrow {
    width: 7px;
    height: 7px;
    border-top: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
    transform: rotate(45deg);
    position: absolute;
    left: 70px;
    top: 7px;
}
.next-line {
    height: 3px;
    width: 30px;
    position: absolute;
    background: #fff;
    top: 10px;
    left: 48px;
}
</style>
<div class="block">
    <div class="out-block">
        <div class="value-block">
            value 5
        </div>
        <div class="next-block">
            Next
            <div class="next-line">
            </div>
            <div class="next-arrow">
            </div>
        </div>
    </div>
    <div class="out-block">
        <div class="value-block">
            value 1
        </div>
        <div class="next-block">
            Next
            <div class="next-line">
            </div>
            <div class="next-arrow">
            </div>
        </div>
    </div>
    <div class="out-block">
        <div class="value-block">
            value 9
        </div>
        <div class="next-block">
            Next
            <div class="next-line">
            </div>
            <div class="next-arrow">
            </div>
        </div>
    </div>
    <div style="display: inline-block;margin-left:15px;color:#fff">
        None
    </div>
</div>
链表实现：Java
```
class LinkedList {
    Node head; // head of list
    /* Linked list Node*/
    class Node {
        int data;
        Node next;
        // Constructor to create a new Node
        // Next is by default initialized
        // as null
        Node(int d) { data = d };
    }
}
```
##### 1. 增加节点
插入节点前一节点指针指向该节点，该节点指针指向后一节点，操作两次
时间复杂度O(1)
##### 2. 删除节点
删除节点前一节点指针指向删除指针的后一节点
时间复杂度O(1)
##### 3. 访问节点
按指针一步一步访问，时间复杂度O(n)
##### 总结：时间复杂度
链表：
prepend   O(1)
append    O(1)
lookup    O(n)
insert    O(1)
delete    O(1)
数组：
prepend   O(1)
append    O(1)
lookup    O(1)
insert    O(n)
delete    O(n)
#### 跳表
例如：每隔1个节点增加一个索引，称为一级索引，可以在一级索引上每隔一个，增加一个二级索引，
以此类推，需要增加 ==log 2n== 级索引
思想：升维，空间换时间
##### 跳表查询的时间复杂度分析：
n/2、n/4、n/8、第k级索引节点的个数就是n/(2^k)
假设索引有h级，最高级的索引有2个节点。
n/(2^h) = 2,从而求得h=log(2n)-1
索引的高度:log n，每层索引遍历的节点个数：3
在跳表中查询任意数据的时间复杂度就是O(log n)