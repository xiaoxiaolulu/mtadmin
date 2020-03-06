import {Loading} from "element-ui"

class MTLoading {
    show(text = null) {
        this.loading = Loading.service({
            fullscreen: true,
            background: "rgba(0, 0, 0, 0.7)",
            spinner: "el-icon-loading",
            text: text ? text : "正在加载中..."
        })
    }

    hide() {
        if (this.loading) {
            this.loading.close()
        }
    }
}

export default new MTLoading()