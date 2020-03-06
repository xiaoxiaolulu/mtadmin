import VueRouter from 'vue-router'
import Vue from 'vue'
import Frame from "./components/Frame";
import Login from "./components/Login";
import Index from "./components/Index";
import Merchant from "./components/Merchant";
import Order from "./components/Order";
import User from "./components/User";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: Frame,
            children: [
                {path: "",component: Index,name:"index"},
                {path: "merchant",component: Merchant,name: "merchant"},
                {path: "order",component: Order,name:"order"},
                {path: "user",component: User,name: "user"},
            ]
        },
        {path: "/login", component: Login, name: "login"},

    ]
});

export default router;
