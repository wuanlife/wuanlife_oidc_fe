1. 用户通过应用访问sso站点，url类似
`https://sso.wuan.com/authorize?client_id=907ffc910de7ba02a321&redirect_uri=https%3A%2F%2Fwww.codewars.com%2Fusers%2Fauth%2Fgithub%2Fcallback&response_type=code&state=3f79399a703e1c577b8467b1fb5ae801ad3bb532f63eb21a&nonce=random`
2. 如果未登录，则跳转到登录界面
`https://sso.wuan.com/login?client_id=907ffc910de7ba02a321&return_to=%2Fauthorize%3Fclient_id%3D907ffc910de7ba02a321%26redirect_uri%3Dhttps%253A%252F%252Fwww.wuanlife.com%252Fusers%252Foidc-cb%26response_type%3Dcode%26state%3D66aaa90a6ac148aa573174e6c05c49bb370f01e5947bbe5a%26nonce%3Drandom`
3. 登录成功后，前端跳转到redirect_uri并附带Access-Token和ID-Token在query中

需要修改的地方
A1 可以不改
A2 参数只需要scope，不要放在url里面，响应JSON。scope的枚举值也没列，叫我怎么给？
U1 只需要email和password, 响应JSON，只有ID-Token
U2 同理，响应JSON，只有ID-Token
U3，根据Access-Token获取对应信息，比如scope只有email的就只有邮件信息。

还有这个U6后端自用接口我有点没懂是用来干嘛的


测试地址
/authorize?client_id=wuan&redirect_uri=https%3A%2F%2Fwww.baidu.com&response_type=code&state=maye&nonce=random

login
http://localhost:9526/login?return_to=%2Fauthorize%3Fclient_id%3Dwuan%26redirect_uri%3Dhttps%253A%252F%252Fwww.baidu.com%26response_type%3Dcode%26state%3Dmaye%26nonce%3Drandom&client_id=wuan
``