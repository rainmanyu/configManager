<template>
  <div class="page-container">
    <div class="opt-bar">
      <el-input v-model="formQuery.operatorName" placeholder="Operator Name" />&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-input v-model="formQuery.domainId" placeholder="Domain Id" />&nbsp;&nbsp;<pi-button @click="handleQuery">Query</pi-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>

    <el-table
        ref="table"
        v-loading="tableLoading"
        class="pi-table"
        :data="tableList"
        header-row-class-name="table-header"
        @selection-change="handleSelectionChange"
    >

      <el-table-column label="Operator" align="center" prop="operatorName" sortable width="200" />
      <el-table-column label="domainId" align="center" prop="domainId" width="100"/>
      <el-table-column label="ENV" align="center" prop="environment" width="120" />
      <el-table-column label="gmENV" align="center" prop="gmENV" width="80" />
      <el-table-column label="status" align="center" prop="status" />
      <el-table-column label="playerAPI" align="center" prop="playerAPI" />
      <el-table-column label="casinoAPI" align="center" prop="casinoAPI" />

      <el-table-column fixed="right" label="Operation" align="center" width="250">
        <template slot-scope="{ row }">
          <el-tooltip
              effect="light"
              content="Edit"
              placement="bottom"
              v-fixtooltip
          >
            <img class="opt-icon" src="@/assets/images/common/edit_icon.png" @click="handleEdit(row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <pi-dialog class="pi-dialog" width="800px" :visible.sync="dialogVisible" :title="getDialogTitle" @close="onCloseDialog" @confirm="onDialogConfirm">
      <el-form ref="dialogForm" :model="formQuery" label-position="right" label-width="6em" style="margin: 0 50px 0 30px" size="medium">
        <el-form-item label="Operator" prop="operatorName">
          <el-input v-model="formQuery.operatorName" />
        </el-form-item>
        <el-form-item label="domainId" prop="domainId">
          <el-input v-model="formQuery.domainId" placeholder="" />
        </el-form-item>
        <el-form-item label="gmENV" prop="gmENV">
          <el-input v-model="formQuery.gmENV" placeholder="" />
        </el-form-item>
        <el-form-item label="partnerID" prop="partnerID">
          <el-input v-model="formQuery.partnerID" placeholder="" />
        </el-form-item>
        <el-form-item label="partnerKey" prop="partnerKey">
          <el-input v-model="formQuery.partnerKey" placeholder="" />
        </el-form-item>
        <el-form-item label="environment" prop="environment">
          <el-input v-model="formQuery.environment" placeholder="" />
        </el-form-item>
        <el-form-item label="region" prop="region">
          <el-input v-model="formQuery.region" placeholder="" />
        </el-form-item>
        <el-form-item label="status" prop="status">
          <el-input v-model="formQuery.status" placeholder="" />
        </el-form-item>
        <el-form-item label="playerAPI" prop="playerAPI">
          <el-input v-model="formQuery.playerAPI" placeholder="" />
        </el-form-item>
        <el-form-item label="casinoAPI" prop="casinoAPI">
          <el-input v-model="formQuery.casinoAPI" placeholder="" />
        </el-form-item>
      </el-form>
    </pi-dialog>
  </div>
</template>
<script>
import {
  addUser,
  editUser
} from "@api/admin/user.js";

import mixins from "@/mixins/page.js";

const formQuery = {
  operatorName: "",
  domainId: ""
};

import request from "@utils/request";
function getOperatorList(data){
  return request({
    url:"/operatorList",
    method:"post",
    data
  })
}

function filterData(data, queryOperatorName, queryDomainId){
  let rtnTableList = [];

  if(isNotEmpty(queryOperatorName)){
    for (let i=0; i<data.length; i++)
    {
      if (isMatch(queryOperatorName, data[i].operatorName)) {
        rtnTableList.push(data[i]);
      }
    }
  }
  else {
    rtnTableList = data;
  }

  let rtnTableList2 = [];
  if(isNotEmpty(queryDomainId)){
    for (let i=0; i<rtnTableList.length; i++)
    {
      if (isMatch(queryDomainId.toString(), rtnTableList[i].domainId.toString())) {
        rtnTableList2.push(rtnTableList[i]);
      }
    }
  }
  else {
    rtnTableList2 = rtnTableList;
  }

  return rtnTableList2;
}

function isNotEmpty(obj) {
  return !(obj==""||obj==null||obj==undefined);
}

function isMatch(regex, content) {
  return (content.indexOf(regex) != -1) ;
}

export default {
  mixins: [mixins],
  data() {
    return {
      tableList: [],
      formQuery: Object.assign({}, formQuery),
      queryOperatorName: "",
      queryDomainId : ""
    };
  },

  computed: {},
  created() {

  },
  methods: {
    getTableListByQuery(qOperatorName, qDomainId) {
      this.queryOperatorName = qOperatorName;
      this.queryDomainId = qDomainId;

      this.getTableList();
    },
    getTableList() {
      getOperatorList().then((res) => {
        this.tableList = res?.data?.list || [];
        this.total = res?.data?.total || 0;

        this.tableList = filterData(this.tableList, this.queryOperatorName, this.queryDomainId);
      });

      this.tableLoading = true;
      setTimeout(() => {
        this.tableLoading = false;
      }, 300);
    },

    editBeforeCallback(row) {
      let { operatorGroup, operatorName, domainId, gmENV, partnerID, partnerKey,
            environment, region, status, playerAPI, casinoAPI, liveLobby, GIC, Notification, BalanceUpdate } = row;
      this.formQuery = { operatorGroup, operatorName, domainId, gmENV, partnerID, partnerKey,
        environment, region, status, playerAPI, casinoAPI, liveLobby, GIC, Notification, BalanceUpdate };
    },

    onDialogConfirm() {
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          this.formQuery.avatar = this.avatarUrl;
          //添加提交
          if (this.openDialogType == "add") {
            // eslint-disable-next-line no-unused-vars
            addUser().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("Add successfully");
            });
          }
          //编辑提交
          else {
            // eslint-disable-next-line no-unused-vars
            editUser().then((res) => {
              this.dialogVisible = false;
              this.getTableList();
              this.$message.success("Edit successfully");
            });
          }
        }
      });
    },
    //弹窗关闭前回调
    closeDialogBeforeCallback() {
      //清空头像url
      this.avatarUrl = "";
    },
    //表格选中监听
    handleSelectionChange(e) {
      this.selectionIds = e.map((item) => {
        return item.id;
      });
    },
    //头像图片上传成功
    onUploadAvatarSuccess(res) {
      this.avatarUrl = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.pi-table {
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
</style>