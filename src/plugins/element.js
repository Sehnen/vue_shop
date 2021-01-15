import Vue from 'vue'
import {Button} from 'element-ui'
import {Form,FormItem} from "element-ui";
import {Input} from "element-ui";
import {Message,Container,Header,Main,Aside} from "element-ui";

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.prototype.$message=Message
