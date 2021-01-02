### 时间复杂度
`O(1)`  `常数复杂度`
`O(log n)`  `对数复杂度`
`O(n)` `线性时间复杂度`
`O(n^2)` `平方`
`O(n^3)` `立方`
`O(2^n)` `指数`
`O(n!)` `阶乘`
==不考虑系数，只看最高复杂度的运算==
##### 时间复杂度曲线
O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n) < O(n!)
##### 栗子
`O(1)`
```
int n = 1000;
System.out.println("you input is: " + n)
```
`O(n)`
```
for(int i=1;i<=n;i++) {
    System.out.println("you input is: " + i)
}
```
`O(n^2)`
```
for(int i=1;i<=n;i++) {
    for(int j=1;j<=n;j++) {
        System.out.println("you input i is: " + i  + " and j is:" + j)
    }
}
```
`O(log(n))`
```
for(int i=1;i<=n;i=i*2) {
    System.out.println("you input is: " + i)
}
```
`O(k^n)`
```
int fib(int n) {
    if(n<=2) return n;
    return fib(n-1) + fib(n-2)
}
```
#### 主定理
1. 二分查找  O(log n)
2. 二叉树遍历(每个节点访问且只访问一次)  O(n)
3. 已排序二维矩阵查找 O(n)
4. 一维数组二分查找 O(log n)
5. 归并排序 O(n log n)
#### 思考题：
##### 1. 二叉树遍历-前序、中序、后序：时间复杂度是多少？
答： 时间复杂度：O(n)，n代表树中节点总数
主定理，每个节点访问且只访问一次
##### 2. 图的遍历：时间复杂度是多少？
答： 时间复杂度：O(n)，图的节点只访问一次，n为图节点总数
##### 3. 搜索算法：DFS(深度优先)、BFS(广度优先)时间复杂度是多少？
答： 时间复杂度：O(n)，n指搜索空间的节点总数
##### 4. 二分查找的时间复杂度？
答： 时间复杂度：O(log n)