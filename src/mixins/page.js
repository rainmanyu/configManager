export default {
    data() {
        return {
            tableQuery: {}, //表格搜索接口参数
            total: 0,
            tableLoading: false,
            dialogVisible: false, //编辑或添加弹窗标识
            originalTableList: [],
            tableList: [],
            openDialogType: "", //edit duplicate
            selectionIds: [], //选中项id数组
        }
    },
    computed: {
        getDialogTitle() {
            let obj = {
                duplicate: "Duplicate",
                edit: "Edit",
                detail: "Detail",
            };
            if (this.openDialogType in obj) {
                return obj[this.openDialogType];
            }

            return "";
        },
    },
    created() {
        this.init();
    },
    methods: {
        init() {

        },
        //查询
        handleSearch() {

        },
        //查询前回调
        searchBeforeCallback() {

        },
        handleReset() {

        },
        //重置前回调
        resetBeforeCallback() {

        },
        //新增
        handleAdd() {
            this.addBeforeCallback()
            this.openDialogType = 'add';
            this.dialogVisible = true;
        },

        handleQuery() {

        },
        addBeforeCallback() {

        },

        handleEdit(row) {
            this.editBeforeCallback(row);
            this.openDialogType = "edit";
            this.dialogVisible = true;
        },

        handleDuplicate(row) {
            this.editBeforeCallback(row);
            this.openDialogType = "duplicate";
            this.dialogVisible = true;
        },

        handleDetail(row) {
            this.editBeforeCallback(row);
            this.openDialogType = "detail";
            this.dialogVisible = true;
        },
        editBeforeCallback(row) {
            print(row);
        },

        //删除前显示模态框
        showDelModal(type = 'all') {
            return new Promise((resolve, reject) => {
                this.$confirm(`确定要删除${type=='all'?'选中的':'该'}项吗？`, "提示", {
                        type: "warning",
                    })
                    .then(res => {
                        resolve(res)

                    })
                    .catch(e => {
                        reject(e)
                    });

            })
        },

        //删除成功回调,重新设置page，刷新列表
        delSuccessCallback(type = 'all') {
            print(type)
        },
        //关闭（新增或编辑）弹窗，恢复表单数据去除表单校验
        onCloseDialog() {
            this.dialogVisible = false;
            this.closeDialogBeforeCallback();
            this.formQuery = this.$options.data().formQuery;
            this.$nextTick(()=>{
                this.$refs["dialogForm"].clearValidate();
            })
        },
        //弹窗关闭前回调
        closeDialogBeforeCallback() {

        }

    },

}