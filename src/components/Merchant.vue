<template>
    <div>
        <h1>商家列表</h1>
        <div class="list-group">
            <el-row :gutter="20">
                <!--                <el-col :span="6" class="col-group">-->
                <!--                    <router-link to="/merchant/detail">-->
                <!--                        <el-card class="card-group add-card">+</el-card>-->
                <!--                    </router-link>-->
                <!--                </el-col>-->
                <el-col :span="6" class="col-group" v-for="merchant in merchants" :key="merchant.id">
                    <el-card class="card-group">
                        <img :src="merchant.logo" class="thumbnail" alt="">
                        <div class="title">{{merchant.name}}</div>
                    </el-card>
                    <!--                    <router-link :to="'/merchant/detail?id='+merchant.id">-->
                    <!--                    </router-link>-->
                </el-col>
            </el-row>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="12"
                    :current-page="page"
                    class="pagination"
                    @current-change="onCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {Card, Col, Pagination, Row} from "element-ui";
    import axios from 'axios';

    export default {
        name: "Merchant",
        data() {
            return {
                merchants: [],
                total: 0,
                page: 1
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Card.name]: Card,
            [Pagination.name]: Pagination
        },
        mounted(){
            this.getMerchants(1)
        },
        methods: {
            onCurrentChange(page) {
                this.getMerchants(page)
            },
            getMerchants(page) {
                const token = this.$auth.token;
                axios.get("http://127.0.0.1:8100/cms/merchant", {
                    params: {
                        page: page
                    },
                    headers: {
                        "Authorization": "JWT " + token
                    }
                }).then(res => {
                    const data = res.data;
                    this.merchants = data.results;
                    this.total = data.count;
                    this.page = page
                }).catch(err => {
                    console.log(err)
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .list-group {
        width: 800px;

        .col-group {
            margin-top: 20px;
            cursor: pointer;

            .card-group {
                height: 180px;
                width: 100%;

                .thumbnail {
                    width: 100%;
                }

                .title {
                    padding-top: 10px;
                }
            }

            .add-card {
                font: bolder 100px '微软雅黑';
                display: flex;
                text-align: center;
                justify-content: center;
                color: #BBBEC7;

                &:hover {
                    box-shadow: 0px 0 1px rgba(0, 0, 0, 0.4);
                }
            }
        }

        .pagination {
            text-align: right;
            padding-top: 20px;
        }
    }
</style>