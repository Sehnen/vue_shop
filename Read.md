**图书表**

tb_book

| 字段名              | 类型         | 说明           | 备注       |
| ------------------- | ------------ | -------------- | ---------- |
| bk_id               | int          | 自增长         | 图书id     |
| bk_isbn             | varchar(20)  |                | 书籍识别码 |
| bk_name             | varcgar(100) |                | 图书名称   |
| bk_cover            | varchar(200) |                | 封面图片   |
| bk_category_id      | int          | 维护一张类别表 | 图书类别   |
| bk_author           | varchar(20)  |                | 作者       |
| bk_press            | varchar(50)  |                | 出版社     |
| bk_publication_time | date         |                | 出版时间   |
| bk_summary          | varchar(200) |                | 内容简介   |
| bk_create_time      | datatime     |                | 添加时间   |
| bk_price            | int          |                | 价格（分） |

book_about
| 字段名           | 类型          | 说明           | 备注           |
| ---------------- | ------------- | -------------- | -------------- |
| bk_id            | int           |                | 图书ID         |
| bk_old_degree    | int           |                | 新旧程度       |
| bk_state_id      | int           | 维护一张状态表 | 书籍状态       |
| bk_seller_id     | int           |                | 卖家ID         |
| bk_buyer_id      | int           |                | 买家ID         |
| bk_seller_images | varchar(1024) |                | 买家发布的照片 |
| bk_comment       | varchar(1024) |                | 用户评论       |
|                  |               |                |                |
|                  |               |                |                |
|                  |               |                |                |
|                  |               |                |                |
|                  |               |                |                |

**用户评论表**

tb_comment

| 字段        | 类型 | 说明 | 备注     |
| ----------- | ---- | ---- | -------- |
| comment_id  | int  |      | 评论ID   |
| book_id     | int  |      | 书籍ID   |
| com_content |      |      | 评论内容 |

**用户回复表**

tb_replay

| 字段        | 类型 | 说明 | 备注     |
| ----------- | ---- | ---- | -------- |
| replay_id   | int  |      | 回复ID   |
| comment_id  | int  |      | 评论ID   |
| rep_content |      |      | 回复内容 |



**图书状态**

bk_state

| 字段          | 类型 | 说明 | 备注                   |
| ------------- | ---- | ---- | ---------------------- |
| book_state_id | int  |      | 书籍状态ID             |
| 1             |      |      | 发布闲置中             |
| 2             |      |      | ==买家下单预定中==     |
| 3             |      |      | ==交易成功已被购买走== |
| 4             |      |      | ==商品已下架==         |
| 5             |      |      | ==其他==               |

订单表

bk_order

| 字段                  | 类型          | 说明               | 备注           |
| --------------------- | ------------- | ------------------ | -------------- |
| order_id              | varchar(20)   |                    | 订单编号ID     |
| order_buyer_id        | int           |                    | 买家ID         |
| order_seller_id       | int           |                    | 卖家ID         |
| order_book_id         | int           |                    | 书籍ID         |
| order_generation_time | varchar(20)   |                    | 订单创建时间   |
| order_pay_time        | datetime      |                    | 订单付款时间   |
| order_end_time        | datetime      |                    | 订单完成时间   |
| order_close_time      | datetime      |                    | 订单关闭时间   |
| comment_time          | datetime      |                    | 评价时间       |
| order_amount          | decimal(10,2) |                    | 交易金额       |
| order_state_id        | int           | 维护一张订单状态表 | 交易状态       |
| order_profit_amount   | int           |                    | 盈利金额（分） |

订单状态表

bk_order_state

| 字段             | 类型        | 说明 | 备注         |
| ---------------- | ----------- | ---- | ------------ |
| order_state_id   | int         |      | 订单状态ID   |
| order_state_name | varchar(20) |      | 订单状态名   |
| 0                | i           |      | 未付款       |
| 1                |             |      | 已付款       |
| 2                |             |      | 已付款未发货 |
| 3                |             |      | 已发货未确认 |
| 4                |             |      | 交易成功     |
| 5                |             |      | 交易关闭     |

用户表

tb_user

| 字段       | 类型        | 说明 | 备注     |
| ---------- | ----------- | ---- | -------- |
| user_id    | int         |      | 用户名ID |
| user_name  | varchar(20) |      | 用户名   |
| password   | char(20)    |      | 密码     |
| mobile     | char(20)    |      | 手机号码 |
| email      | char(20)    |      | 邮箱     |
| address_id | int         |      | 地址编号 |

地址表

tb_address

| 字段           | 类型         | 说明 | 备注     |
| -------------- | ------------ | ---- | -------- |
| address_id     | int          |      | 地址id   |
| address_detail | varchar(255) |      | 详细地址 |

图书类别表

bk_category

| 字段               | 类型        | 说明 | 备注     |
| ------------------ | ----------- | ---- | -------- |
| bk_category_id     | int         |      | 类别ID   |
| bk_category_detail | varchar(50) |      | 类别说明 |

收藏表



| 字段    | 类型        | 说明 | 备注   |
| ------- | ----------- | ---- | ------ |
| bk_id   | int         |      | 类别ID |
| user_id | varchar(50) |      | 用户ID |



购物车表



| 字段    | 类型        | 说明 | 备注     |
| ------- | ----------- | ---- | -------- |
| user_id | int         |      | 用户ID   |
| bk_id   | varchar(50) |      | 图书编号 |
| bk_num  | int         |      | 图书数量 |



库存表



| 字段    | 类型 | 说明 | 备注     |
| ------- | ---- | ---- | -------- |
| book_id | int  |      | 类别ID   |
| bk_num  | int  |      | 图书数量 |

