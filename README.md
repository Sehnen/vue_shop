# 数据库表设计



## **图书表**

tb_book

| 字段名              | 类型         | 说明           | 备注       |
| ------------------- | ------------ | -------------- | ---------- |
| bk_id               | int          | 自增长         | 图书id     |
| bk_isbn             | varchar(25)  |                | 书籍识别码 |
| bk_name             | varcgar(25)  |                | 图书名称   |
| bk_cover            | varchar(255) |                | 封面图片   |
| bk_category_id      | int          | 维护一张类别表 | 图书类别   |
| bk_author           | varchar(25)  |                | 作者       |
| bk_press            | varchar(25)  |                | 出版社     |
| bk_publication_time | date         |                | 出版时间   |
| bk_summary          | varchar(255) |                | 内容简介   |
| bk_create_time      | datatime     |                | 添加时间   |
| bk_price            | int          |                | 价格（分） |

## **图书额外业务表**

bk_about

| 字段名           | 类型          | 说明           | 备注           |
| ---------------- | ------------- | -------------- | -------------- |
| bk_id            | int           |                | 图书ID         |
| bk_old_degree    | int           |                | 新旧程度       |
| bk_state_id      | int           | 维护一张状态表 | 书籍状态       |
| bk_seller_id     | int           |                | 卖家ID         |
| bk_buyer_id      | int           |                | 买家ID         |
| bk_seller_images | varchar(1024) |                | 买家发布的照片 |
| bk_comment       | varchar(1024) |                | 用户评论       |

## **用户评论表**

tb_comment

| 字段        | 类型          | 说明 | 备注     |
| ----------- | ------------- | ---- | -------- |
| comment_id  | int           |      | 评论ID   |
| bk_id       | int           |      | 书籍ID   |
| com_content | varchar(1024) |      | 评论内容 |

##  **用户回复表**

tb_replay

| 字段        | 类型          | 说明 | 备注     |
| ----------- | ------------- | ---- | -------- |
| replay_id   | int           |      | 回复ID   |
| comment_id  | int           |      | 评论ID   |
| rep_content | varchar(1024) |      | 回复内容 |



## **图书状态**

bk_state

| 字段            | 类型     | 说明 | 备注               |
| --------------- | -------- | ---- | ------------------ |
| bk_state_id     | int      |      | 书籍状态ID         |
| bk_state_detail | char(25) |      | 书籍状态描述       |
| 1               |          |      | 发布闲置中         |
| 2               |          |      | 买家下单预定中     |
| 3               |          |      | 交易成功已被购买走 |
| 4               |          |      | 商品已下架         |
| 5               |          |      | 其他               |

## 订单表

bk_order

| 字段                  | 类型        | 说明               | 备注           |
| --------------------- | ----------- | ------------------ | -------------- |
| order_id              | varchar(25) |                    | 订单编号ID     |
| order_buyer_id        | int         |                    | 买家ID         |
| order_seller_id       | int         |                    | 卖家ID         |
| order_book_id         | int         |                    | 书籍ID         |
| order_generation_time | varchar(25) |                    | 订单创建时间   |
| order_pay_time        | datetime    |                    | 订单付款时间   |
| order_end_time        | datetime    |                    | 订单完成时间   |
| order_close_time      | datetime    |                    | 订单关闭时间   |
| comment_time          | datetime    |                    | 评价时间       |
| order_amount          | int         |                    | 交易金额（分） |
| order_state_id        | int         | 维护一张订单状态表 | 订单状态       |

## 订单状态表

bk_order_state

| 字段             | 类型        | 说明 | 备注         |
| ---------------- | ----------- | ---- | ------------ |
| order_state_id   | int         |      | 订单状态ID   |
| order_state_name | varchar(25) |      | 订单状态名   |
| 0                |             |      | 未付款       |
| 1                |             |      | 已付款       |
| 2                |             |      | 已付款未发货 |
| 3                |             |      | 已发货未确认 |
| 4                |             |      | 交易成功     |
| 5                |             |      | 交易关闭     |

## 用户表

tb_user

| 字段                | 类型        | 说明 | 备注           |
| ------------------- | ----------- | ---- | -------------- |
| user_id             | int         |      | 用户名ID       |
| user_name           | varchar(25) |      | 用户名         |
| password            | char(25)    |      | 密码           |
| mobile              | char(25)    |      | 手机号码       |
| email               | char(25)    |      | 邮箱           |
| address_id          | int         |      | 地址编号       |
| order_profit_amount | int         |      | 盈利金额（分） |

## 地址表

tb_address

| 字段           | 类型         | 说明 | 备注     |
| -------------- | ------------ | ---- | -------- |
| address_id     | int          |      | 地址ID   |
| address_detail | varchar(255) |      | 详细地址 |

## 图书类别表

bk_category

| 字段               | 类型        | 说明 | 备注       |
| ------------------ | ----------- | ---- | ---------- |
| bk_category_id     | int         |      | 图书类别ID |
| bk_category_detail | varchar(25) |      | 类别说明   |

## 收藏表

tb_collect

| 字段    | 类型 | 说明 | 备注   |
| ------- | ---- | ---- | ------ |
| bk_id   | int  |      | 书籍ID |
| user_id | int  |      | 用户ID |



## 购物车表

tb_cart

| 字段    | 类型        | 说明 | 备注     |
| ------- | ----------- | ---- | -------- |
| user_id | int         |      | 用户ID   |
| bk_id   | varchar(25) |      | 图书编号 |
| bk_num  | int         |      | 图书数量 |



## 库存表

tb_stock

| 字段   | 类型 | 说明 | 备注     |
| ------ | ---- | ---- | -------- |
| bk_id  | int  |      | 书籍ID   |
| bk_num | int  |      | 图书数量 |

