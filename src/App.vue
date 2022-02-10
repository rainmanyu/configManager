<template>
  <div class="page-container" v-loading="tableLoading">
    <el-form ref="queryForm" label-position="right" label-width="6em" size="medium" style=“width:500px>
      <el-row>
        <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
      </el-row>
      <el-row>
        <el-col :span=6>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
        <el-col :span=12>
          <el-col :span=8>
            <el-form-item label="operatorName">
              <el-input v-model="queryOperatorName" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="domainId">
              <el-input v-model="queryDomainId" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="ENV">
              <el-input v-model="queryENV" placeholder="" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span=6></el-col>
      </el-row>
      <el-row>
        <el-col :span=9>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
        <el-col :span=6>
          <el-col :span=6>
            <el-button @click="handleQuery">Query</el-button>
          </el-col>
          <el-col :span=6>
            <el-button @click="handleReset">Reset</el-button>
          </el-col>
          <el-col :span=12>
            <el-button @click="handleUpdateVersion">Update Version</el-button>
          </el-col>
        </el-col>
        <el-col :span=9></el-col>
      </el-row>
    </el-form>

    <el-table ref="table" v-loading="tableLoading" class="pi-table" :data="tableList" header-row-class-name="table-header"
              @selection-change="handleSelectionChange">

      <el-table-column label="Operator" align="center" prop="operatorName" sortable width="200" />
      <el-table-column label="domainId" align="center" prop="domainId" width="80"/>
      <el-table-column label="ENV" align="center" prop="environment" width="120" />
      <el-table-column label="status" align="center" prop="status" />
      <el-table-column label="playerAPI" align="center" prop="playerAPI" />
      <el-table-column label="tag" align="center" prop="player_version_tag" />
      <el-table-column label="deploy time" align="center" prop="player_version_deploy_time" />
      <el-table-column label="casinoAPI" align="center" prop="casinoAPI" />
      <el-table-column label="version" align="center" prop="casino_version_tag" />
      <el-table-column label="deploy time" align="center" prop="casino_version_deploy_time" />

      <el-table-column fixed="right" label="Operation" align="center" width="250">
        <template slot-scope="{ row }">
          <el-row>
            <el-col :span=9><div style="word-spacing:10px">{{"\xa0\xa0"}}</div></el-col>
            <el-col :span=6>
              <el-col :span=24>
                <img class="opt-icon" src="@/assets/images/common/edit_icon.png" @click="handleEdit(row)" />
              </el-col>
<!--              <el-col :span=12>-->
<!--                <img class="opt-icon" src="@/assets/images/common/add_icon.png" @click="handleDuplicate(row)" />-->
<!--              </el-col>-->
            </el-col>
            <el-col :span=9></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pi-dialog class="pi-dialog" width="1500px" :visible.sync="dialogVisible" :title="getDialogTitle" >
      <el-form ref="dialogForm" :model="row" label-position="right" label-width="6em" style="margin: 0 50px 0 30px" size="medium">
        <el-row>
          <el-col :span=8>
            <el-form-item label="Operator">
              <el-input v-model="row.operatorName" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="domainId">
              <el-input v-model="row.domainId" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="gmENV">
              <el-input v-model="row.gmENV" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=8>
            <el-form-item label="partnerID">
              <el-input v-model="row.partnerID" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="partnerKey">
              <el-input v-model="row.partnerKey" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="environment">
              <el-input v-model="row.environment" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=8>
            <el-form-item label="region">
              <el-input v-model="row.region" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="status">
              <el-input v-model="row.status" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="frontend">
              <el-input v-model="row.frontend" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=10>
            <el-form-item label="player URL">
              <el-input v-model="row.playerAPI" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="version tag">
              <el-input v-model="row.player_version_tag" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="deploy time">
              <el-input v-model="row.player_version_deploy_time" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=10>
            <el-form-item label="casino URL">
              <el-input v-model="row.casinoAPI" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="version tag">
              <el-input v-model="row.casino_version_tag" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="deploy time">
              <el-input v-model="row.casino_version_deploy_time" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=10>-</el-col>
          <el-col :span=4>
            <el-col :span=12>
              <el-button @click="onDialogConfirm">Confirm</el-button>
            </el-col>
            <el-col :span=12>
              <el-button @click="onCloseDialog">Cancel</el-button>
            </el-col>
          </el-col>
          <el-col :span=10></el-col>
        </el-row>

      </el-form>
    </pi-dialog>
  </div>
</template>
<script>
import {
  addUser
} from "@api/admin/user.js";

import mixins from "@/mixins/page.js";
// import VueLoading from 'vuejs-loading-plugin'
// Vue.use(VueLoading)
// Vue.use(VueLoading, {
//   dark: true, // default false
//   text: 'Ladataan', // default 'Loading'
//   loading: true, // default false
//   background: 'rgb(255,0,0)', // set custom background
//   classes: ['myclass'] // array, object or string
// })

const formQuery = {
  operatorName: "",
  domainId: "",
  ENV: ""
};

const row = {
  "operatorGroup": "",
  "operatorName": "Tringobet.com",
  "domainId": 2562,
  "gmENV": "stage",
  "partnerID": "TrigobetID",
  "partnerKey": "TrigobetCode",
  "environment": "stage",
  "region": "",
  "status": "",
  "playerAPI": "https://tringobet-com-api.stage.norway.everymatrix.com/v1/player/swagger-ui.html",
  "casinoAPI": "https://tringobet-com-api.stage.norway.everymatrix.com/v1/casino/swagger-ui.html",
  "liveLobby": "https://tringobet-com-api.stage.norway.everymatrix.com/v1/encoder/lobby/updates/{vendor}/{tableId}",
  "GIC": "",
  "Notification": "",
  "BalanceUpdate": "",
  "player_base": "https://tringobet-com-api.stage.norway.everymatrix.com",
  "player_version_tag": "tag-master-V1.60.1",
  "player_version_deploy_time": "2022-01-28 07:58:14",
  "casino_base": "https://tringobet-com-api.stage.norway.everymatrix.com",
  "casino_version_tag": "tag-master-V1.60.2",
  "casino_version_deploy_time": "2022-01-29 05:48:21",
  "frontend": "EM_FE"
};



import axios from "axios";
import {g_server_site_url, g_server_sites_url, g_server_update_version_url} from "@/config/config";

function filterData(data, queryOperatorName, queryDomainId, queryENV){
  let rtnTableList = [];

  //Query 1
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

  //Query 2
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

  //Query 3
  let rtnTableList3 = [];
  if(isNotEmpty(queryENV)){
    for (let i=0; i<rtnTableList2.length; i++)
    {
      if (isMatch(queryENV.toString(), rtnTableList2[i].environment.toString())) {
        rtnTableList3.push(rtnTableList2[i]);
      }
    }
  }
  else {
    rtnTableList3 = rtnTableList2;
  }

  return rtnTableList3;
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
      row: Object.assign({}, row),
      queryOperatorName: "",
      queryDomainId : "",
      queryENV : ""
    };
  },

  computed: {},
  created() {
    this.getSitesTableList();
  },
  methods: {
    getSitesTableList() {
      this.tableLoading = true;
      axios.get(g_server_sites_url).then(resp => {
        this.tableList = filterData(resp.data.list, this.queryOperatorName, this.queryDomainId, this.queryENV);
        this.total = this.tableList.length;
        this.tableLoading = false;
      });
    },

    editBeforeCallback(row) {
      this.row = row;
    },
    handleQuery() {
      this.getSitesTableList();
    },
    handleReset() {
      this.queryOperatorName = ''
      this.queryDomainId = ''
      this.queryENV = ''
      this.getSitesTableList();
    },
    handleUpdateVersion() {
      this.tableLoading = true;
      axios.get(g_server_update_version_url).then(resp => {
        if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok') {
          this.$message.success("Update version successfully. Spent time:" + resp.data['spent_time']);
        }
        else {
          this.$message.success("Update version failed");
        }

        this.tableLoading = false;
      });
    },
    onDialogConfirm() {
      this.dialogVisible = false;
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          //添加提交
          if (this.openDialogType == "duplicate") {
            // eslint-disable-next-line no-unused-vars
            addUser().then((res) => {
              this.dialogVisible = false;
              this.getSitesTableList();
              this.$message.success("Add successfully");
            });
          }
          else {
            axios.post(g_server_site_url+this.row['domainId'], this.row).then(resp => {
              if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok') {
                console.log(resp.data);
                this.dialogVisible = false;
                this.getSitesTableList();
                this.$message.success("Operation successfully");
              }
              else {
                this.$message.success("Operation failed");
              }
            });
          }
        }
      });
    },

    closeDialogBeforeCallback() {
      this.avatarUrl = "";
    },

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