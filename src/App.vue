<template>
  <div class="page-container" v-loading="tableLoading">
    
    <div class="tableLine"><span class="midText"></span></div>

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
          <el-col :span=12>
            <el-button @click="handleQuery">Query</el-button>
          </el-col>
          <el-col :span=12>
            <el-button @click="handleReset">Reset</el-button>
          </el-col>
        </el-col>
        <el-col :span=9></el-col>
      </el-row>
    </el-form>

    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
    <div class="tableLine"><span class="midText"></span></div>
    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>

    <el-row>
      <el-col :span=19>
        <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
      </el-col>
      <el-col :span=3>
        <el-button @click="handleUpdateVersion">Update Version</el-button>
      </el-col>
      <el-col :span=2>
        <el-button @click="handleNew">New</el-button>
      </el-col>
    </el-row>

    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
    <div class="tableLine"><span class="midText"></span></div>
    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>

    <el-table ref="table" v-loading="tableLoading" :data="tableList" header-row-class-name="table-header"
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange">

      <el-table-column label="Operator" align="center" prop="operatorName" width="200" />
      <el-table-column label="domainId" align="center" prop="domainId" width="80"/>
      <el-table-column label="ENV" align="center" prop="environment" width="120" />
      <el-table-column label="key" align="center" prop="key" width="80" />
      <el-table-column label="frontend" align="center" prop="frontend" />
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
              <el-col :span=12>
                <img class="opt-icon" src="@/assets/images/common/edit_icon.png" @click="handleEdit(row)" />
              </el-col>
              <el-col :span=12>
                <img class="opt-icon" src="@/assets/images/common/add_icon.png" @click="handleDuplicate(row)" />
              </el-col>
            </el-col>
            <el-col :span=9></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <pi-dialog class="pi-dialog" width="1500px" :visible.sync="dialogVisible" :title="getDialogTitle" >
      <el-form ref="dialogForm"
               :model="row"
               label-position="right" label-width="6em" style="margin: 0 50px 0 30px" size="medium">
        <el-row>
          <el-col :span=8>
            <el-form-item label="Operator">
              <el-input v-model="row.operatorName"/>
            </el-form-item>
          </el-col>
          <el-col :span=8>
            <el-form-item label="domainId" >
              <el-input v-model="row.domainId" placeholder="" v-bind:readonly="openDialogType=='edit'"
                        :class="{ 'no-edit-input':(openDialogType=='edit'), 'edit-input':(openDialogType=='duplicate')}"
              />
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
              <el-select v-model="row.frontend" placeholder="Select">
                <el-option
                    v-for="item in frontend_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
              </el-select>
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
              <el-input v-model="row.player_version_tag" placeholder="" v-bind:readonly="openDialogType=='edit'"
                        :class="{ 'no-edit-input':(openDialogType=='edit'), 'edit-input':(openDialogType=='duplicate')}"
              />
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="deploy time">
              <el-input v-model="row.player_version_deploy_time" placeholder="" v-bind:readonly="openDialogType=='edit'"
                        :class="{ 'no-edit-input':(openDialogType=='edit'), 'edit-input':(openDialogType=='duplicate')}"
              />
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
              <el-input v-model="row.casino_version_tag" placeholder="" v-bind:readonly="openDialogType=='edit'"
                        :class="{ 'no-edit-input':(openDialogType=='edit'), 'edit-input':(openDialogType=='duplicate')}"
              />
            </el-form-item>
          </el-col>
          <el-col :span=6>
            <el-form-item label="deploy time">
              <el-input v-model="row.casino_version_deploy_time" placeholder="" v-bind:readonly="openDialogType=='edit'"
                        :class="{ 'no-edit-input':(openDialogType=='edit'), 'edit-input':(openDialogType=='duplicate')}"
              />
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

    <pi-dialog class="pi-dialog" width="600px" :visible.sync="newDialogVisible" title="New" >
      <el-form ref="dialogForm"
               :model="new_site"
               label-position="right" label-width="6em" style="margin: 0 50px 0 30px" size="medium">
        <el-row>
          <el-col :span=12>
            <el-form-item label="Name">
              <el-input v-model="new_site.operatorName"/>
            </el-form-item>
          </el-col>
          <el-col :span=1>
            <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
          </el-col>
          <el-col :span=11>
            <el-form-item label="domainId" >
              <el-input v-model="new_site.domainId" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=12>
            <el-form-item label="frontend">
              <el-select v-model="row.frontend" placeholder="Select">
                <el-option
                    v-for="item in frontend_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=1>
            <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
          </el-col>
          <el-col :span=11>
            <el-form-item label="environment">
              <el-select v-model="new_site.environment" placeholder="Select">
                <el-option
                    v-for="item in environment_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span=8>-</el-col>
          <el-col :span=10>
            <el-col :span=12>
              <el-button @click="onNewDialogConfirm">Confirm</el-button>
            </el-col>
            <el-col :span=12>
              <el-button @click="onNewDialogClose">Cancel</el-button>
            </el-col>
          </el-col>
          <el-col :span=4></el-col>
        </el-row>
      </el-form>
    </pi-dialog>
  </div>
</template>
<script>

import axios from "axios";
import {g_server_site_url, g_server_sites_url, g_server_update_version_url} from "@/config";
import Vue from "vue";
import mixins from "@/page.js";
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert)

const formQuery = {
  operatorName: "",
  domainId: "",
  ENV: ""
};

const init_site = {
  "operatorGroup": "",
  "operatorName": "",
  "domainId": -1,
  "gmENV": "stage",
  "partnerID": "",
  "partnerKey": "",
  "environment": "stage",
  "region": "",
  "status": "",
  "playerAPI": "",
  "casinoAPI": "",
  "liveLobby": "",
  "GIC": "",
  "Notification": "",
  "BalanceUpdate": "",
  "player_base": "",
  "player_version_tag": "not_ready",
  "player_version_deploy_time": "not_ready",
  "casino_base": "not_ready",
  "casino_version_tag": "not_ready",
  "casino_version_deploy_time": "not_ready",
  "frontend": "EM_FE",
  "update_time": ""
};


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
  let content_lowercase = content.toLowerCase();
  let regex_lowercase = regex.toLowerCase();
  return (content_lowercase.indexOf(regex_lowercase) != -1) ;
}

export default {
  mixins: [mixins],
  data() {
    return {
      tableList: [],
      formQuery: Object.assign({}, formQuery),
      row: Object.assign({}, init_site),
      new_site: Object.assign({}, init_site),
      edit_row: Object.assign({}, init_site),
      duplicate_row: Object.assign({}, init_site),
      queryOperatorName: "",
      queryDomainId : "",
      queryENV : "",
      frontend_options: [{
        value: 'NONE_EM_FE',
        label: 'NONE_EM_FE'
      }, {
        value: 'EM_FE',
        label: 'EM_FE'
      }],
      environment_options: [{
        value: 'stage',
        label: 'stage'
      }, {
        value: 'production',
        label: 'production'
      }],
    }
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
      this.row = Object.assign({}, row);

      if (this.openDialogType == "duplicate") {
        this.row.operatorName = '';
        this.row.domainId = '';
        this.row.player_version_tag = 'not_ready';
        this.row.player_version_deploy_time = 'not_ready';
        this.row.casino_version_tag = 'not_ready';
        this.row.casino_version_deploy_time = 'not_ready';
      }
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
    handleNew() {
      this.newDialogVisible = true
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
          axios.post(g_server_site_url+this.row['key'], this.row).then(resp => {
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
      });
    },

    onNewDialogConfirm() {
      let domainId = this.new_site.domainId;
      console.log(domainId)
      if (domainId == "" || domainId == null || domainId == undefined) {
        this.$message.error("domain id is invalid. empty value");
      }
      else if (domainId === -1) {
        this.$message.error("domain id is invalid. incorrect domain idd value.");
      }
      else {
        this.$confirm("Are you sure?").then(() => {
          //do something...
        });
      }
    },
    onNewDialogClose() {
      this.newDialogVisible = false;
    },

    closeDialogBeforeCallback() {
      this.avatarUrl = "";
    },

    handleSelectionChange(e) {
      this.selectionIds = e.map((item) => {
        return item.id;
      });
    },
 
    onUploadAvatarSuccess(res) {
      this.avatarUrl = res.data;
    },

    tableRowClassName({row, rowIndex}) {
      if (row.domainId != row.key) {
        console.log(row.domainId + '-' + row.key + '-' + rowIndex + '-not_equal');
        return 'info-row';
      } else  {
        console.log(row.domainId + '-' + row.key + '-' + rowIndex + '-equal');
        return '';
      }
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

.tableLine {
    position: relative;
    margin: 0 auto;
    // width: 600px;
    height: 2px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
 .midText {
    position: absolute;
    left: 50%;
    background-color: #ffffff;
    padding: 0 15px;
    transform: translateX(-50%) translateY(-50%);
  }


</style>
<style scoped>
.no-edit-input>>>.el-input__inner{
  font-size: 18px!important;
  color:#000000!important;
  background-color:#EEEEEE;
  font-family: cursive!important;
}

.edit-input>>>.el-input__inner{
  font-size: 18px!important;
  color:#000000!important;
  background-color:#FFEEBB;
  font-family: cursive!important;
}


</style>