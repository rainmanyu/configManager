export default {
    data() {
        return {
            tableQuery: {}, //表格搜索接口参数
            total: 0,
            tableLoading: false,
            dialogVisible: false, //编辑或添加弹窗标识
            originalTableList: [],
            tableList: [],
            openDialogType: "", //弹窗类型add:'添加'，edit:'编辑'，detail:'详情'
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
        this.getTableList();
    },
    methods: {
        init() {

        },
        //查询
        handleSearch() {
            this.searchBeforeCallback();
            if (this.tableQuery && this.tableQuery.page) {
                this.tableQuery.page = 1;
            }
            this.getTableList();
        },
        //查询前回调
        searchBeforeCallback() {

        },
        handleReset() {
            this.formQuery.operatorName = ''
            this.formQuery.domainId = ''
            this.formQuery.ENV = ''
            this.getTableListByQuery(this.formQuery.operatorName, this.formQuery.domainId, this.formQuery.ENV);
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
            this.getTableListByQuery(this.formQuery.operatorName, this.formQuery.domainId, this.formQuery.ENV);
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
            print(row)
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
            //判断最后一页是否全部都删除,全删除page-1；只有1页page=1
            let totalPage = Math.ceil(this.total / (this.tableQuery.limit || this.tableQuery.pageSize || this.tableQuery.size)); //总页数
            if (this.tableQuery.page == totalPage) {
                //处在最后一页
                let lastPageCount = this.tableList.length % (this.tableQuery.limit || this.tableQuery.pageSize || this.tableQuery.size);
                if (lastPageCount == (type == 'all' ? this.selectionIds.length : 1)) {
                    totalPage > 1 ?
                        (this.tableQuery.page -= 1) :
                        (this.tableQuery.page = 1);
                }
            }
            //刷新列表数据
            this.getTableList();
            this.$message.success('删除成功')

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