<template>
    <div class="merchant-detail">
        <h1>商家详情</h1>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="1">
                <el-form ref="myForm" :model="myForm" label-width="80px" class="form-group" :rules="rules">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="myForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="address">
                        <el-input v-model="myForm.address" placeholder="请输入地址"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺logo" prop="logo" title="商家logo">
                        <el-upload
                                class="logo-upload"
                                action="http://127.0.0.1:8100/cms/upload"
                                :header="headers"
                                :show-file-list="false"
                                :on-success="onUploadSuccess"
                                :before-upload="onBeforeUpload"
                        >
                            <img v-if="myForm.logo" :src="myForm.logo" class="logo" alt=""/>
                            <i v-else class="el-icon-plus logo-upload-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="店铺经度" prop="lon">
                        <el-input v-model="myForm.lon" placeholder="请输入经度"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺纬度" prop="lat">
                        <el-input v-model="myForm.lat" placeholder="请输入纬度"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺公告" prop="notice">
                        <el-input v-model="myForm.notice" placeholder="请输入公告"></el-input>
                    </el-form-item>
                    <el-form-item label="起送价格" prop="up_send">
                        <el-input v-model="myForm.up_send" placeholder="请输入起送价"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.prevent="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品管理" name="2">商品管理</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {Tabs, TabPane, Form, FormItem, Input, Upload, Button, Dialog} from "element-ui";

    export default {
        name: "MerchantDetail",
        data() {
            return {
                activeName: "1",
                headers: {"Authorization": "JWT " + this.$auth.token},
                myForm: {
                    name: "",
                    logo: "",
                    address: "",
                    notice: "",
                    up_send: "0",
                    lon: "",
                    lat: ""
                },
                rules: {
                    name: [{required: true, message: "请输入商家名称！", trigger: "blur"}],
                    address: [{required: true, message: "请输入地址！", trigger: "blur"}],
                    logo: [{required: true, message: "请上传图片！", trigger: "blur"}],
                    lon: [{required: true, message: "请输入经度！", trigger: "blur"}],
                    lat: [{required: true, message: "请输入纬度！", trigger: "blur"}]
                },
            }
        },
        components: {
            [Tabs.name]: Tabs,
            [TabPane.name]: TabPane,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
            [Upload.name]: Upload,
            [Button.name]: Button,
            [Dialog.name]: Dialog
        },
        methods: {
            onUploadSuccess(res, file) {
                this.myForm.logo = res.picture;
                console.log(file)
            },
            onBeforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    alert('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    alert('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            onSubmit() {
                this.$refs['myForm'].validate(valid => {
                    if (!valid) {
                        return
                    }
                    this.$loading.show();
                    this.$http.addMerchant(this.myForm).then(res => {
                        console.log(res);
                        this.$loading.hide();
                    }).catch(err => {
                        console.log(err);
                        this.$loading.hide();
                    })
                })
            }
        }
    }
</script>

<style scoped lang='scss'>
    .form-group {
        padding-top: 20px;
        width: 460px;
    }

    .logo-upload {
        .logo {
            width: 178px;
            height: 133px;
            display: block;
        }

        .logo-upload-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 133px;
            line-height: 133px;
            text-align: center;
        }
    }

    .category-list {
        width: 800px;

        .category-group {
            .category-box {
                padding: 10px;
                box-sizing: border-box;
            }

            .add-category {
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            .category-info {
                background-color: rgb(217, 236, 255);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .goods-list {
                .goods-group {
                    font-size: 14px;
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    margin: 10px 0;
                    background-color: #ddd;

                    &:hover {
                        background-color: #ccc;
                    }

                    &:hover .ops-group {
                        display: block;
                    }

                    .ops-group {
                        display: none;
                        font-size: 12px;
                        justify-content: space-between;

                        span {
                            cursor: pointer;
                        }

                        .edit {
                            margin-right: 10px;
                        }
                    }
                }

                .add-goods {
                    background-color: #ddd;
                    text-align: center;
                    padding: 10px;
                    cursor: pointer;
                    margin-bottom: 20px;
                }
            }
        }
    }
</style>

<style scoped>
    .logo-upload >>> .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .logo-upload >>> .el-upload:hover {
        border-color: #409eff;
    }
</style>