<template>
  <div class="page-container" v-loading="tableLoading" element-loading-text="Loading...">
    <div class="tableLine"><span class="midText"></span></div>
    <el-form ref="queryForm" label-position="right" label-width="6em" size="medium" style=“width:500px>
      <el-row>
        <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
      </el-row>
      <el-row>
        <el-col :span=8>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
        <el-col :span=8>
          <el-col :span=12>
            <el-form-item label="operatorName">
              <el-input v-model="queryOperatorName" @input="handleQuery" />
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="domainId">
              <el-input v-model="queryDomainId" placeholder="" @input="handleQuery" />
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span=8></el-col>
      </el-row>
      <el-row>
        <el-col :span=8>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
        <el-col :span=8>
          <el-col :span=12>
            <el-form-item label="ENV">
              <el-select v-model="queryENV" placeholder="Select" @change="handleQuery">
                <el-option
                    v-for="item in query_environment_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span=12>
            <el-form-item label="frontend">
              <el-select v-model="queryFrontend" placeholder="Select" @change="handleQuery">
                <el-option
                    v-for="item in query_frontend_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span=8>
          <el-col :span=1>
            <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
          </el-col>
          <el-col :span=23>
            <el-button @click="handleReset">Reset</el-button>
          </el-col>

        </el-col>
      </el-row>
    </el-form>
    
    <div class="tableLine"><span class="midText"></span></div>
    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>

    <el-row>
      <el-col :span=9>
        <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
      </el-col>
      <el-col :span=8>
        <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
      </el-col>
      <el-col :span=7>
        <el-col :span=4>
          <el-button @click="handleNew">New a site</el-button>
        </el-col>
        <el-col :span=2>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
		<el-col :span=4>
          <el-button @click="reload">Reload</el-button>
        </el-col>
        <el-col :span=2>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
        <el-col :span=4>
          <el-button @click="handleUpdateVersion">Sync tags</el-button>
        </el-col>
        <el-col :span=2>
          <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
        </el-col>
		<el-col :span=6>
			<el-button @click="showImportDlg">Import Excel</el-button>
		</el-col>
      </el-col>
    </el-row>
	<el-row>
		<el-col :span=24>
			<div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
		</el-col>
	</el-row>
    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
    <div class="tableLine"><span class="midText"></span></div>
    <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>

    <el-table ref="table" :data="tableList">

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
            <el-col :span=7><div style="word-spacing:10px">{{"\xa0\xa0"}}</div></el-col>
            <el-col :span=10>
              <el-col :span=7>
                <img class="opt-icon" src="@/edit_icon.png" @click="handleEdit(row)" />
              </el-col>
              <el-col :span=2>
                <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
              </el-col>
              <el-col :span=6>
                <img class="opt-icon" src="@/refresh.jpeg" @click="handleUpdateTag(row)" />
              </el-col>
              <el-col :span=2>
                <div style="word-spacing:10px">{{"\xa0\xa0"}}</div>
              </el-col>
              <el-col :span=7>
                <img class="opt-icon" src="@/delete_icon.png" @click="handleDelete(row)" />
              </el-col>
            </el-col>
            <el-col :span=7></el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog class="pi-dialog" width="1500px" :visible.sync="dialogVisible" title="Edit" >
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
              <el-input v-model="row.domainId" placeholder="" readonly=true />
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
    </el-dialog>

    <el-dialog class="pi-dialog" width="600px" :visible.sync="newDialogVisible" title="New" >
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
    </el-dialog>
	
	<el-dialog class="pi-dialog" width="600px" :visible.sync="importDialogVisible" title="Upload" v-loading="importDlgLoading">
		<el-row>
			<el-col :span=16>
				<input id="fileinput" @change="uploading($event)" type="file" accept="*">
			</el-col>
			<el-col :span=8>				
				<el-button @click="submit($event)">Submit</el-button>
			</el-col>
		</el-row>
	</el-dialog>
  </div>
</template>
<script>

import axios from "axios";
import {
  g_server_site_url,
  g_server_sites_url,
  g_server_update_site_tag_url,
  g_server_update_version_url,
  g_server_upload_url
} from "@/config";


const formQuery = {
  operatorName: "",
  domainId: "",
  ENV: ""
};

const init_site = {
  "operatorGroup": "",
  "operatorName": "default",
  "domainId":0,
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
  "update_time": "",
  "key":"0"
};

function isNotEmpty(obj) {
  return !(obj==""||obj==null||obj==undefined);
}

function isMatch(regex, content) {
  let content_lowercase = content.toLowerCase();
  let regex_lowercase = regex.toLowerCase();
  return (content_lowercase.indexOf(regex_lowercase) != -1) ;
}

export default {
  data() {
    return {
      tableQuery: {}, 
      tableLoading: false,
		importDlgLoading: false,
      dialogVisible: false,
      newDialogVisible: false,
		importDialogVisible: false,
      originalTableList: [],
      openDialogType: "", //edit duplicate
      tableList: [],
      fullTableList: [],
      formQuery: Object.assign({}, formQuery),
      row: Object.assign({}, init_site),
      new_site: Object.assign({}, init_site),
      edit_row: Object.assign({}, init_site),
      duplicate_row: Object.assign({}, init_site),
      queryOperatorName: "",
      queryDomainId : "",
      queryENV : "ALL",
      queryFrontend : "ALL",
      frontend_options: [{
        value: 'EXTERNAL_FE',
        label: 'EXTERNAL_FE'
      }, {
        value: 'EM_FE',
        label: 'EM_FE'
      }, {
		value: 'UNKNOWN',
		label: 'UNKNOWN'
	}],
      query_frontend_options: [{
        value: 'ALL',
        label: 'ALL'
      },{
        value: 'EXTERNAL_FE',
        label: 'EXTERNAL_FE'
      }, {
        value: 'EM_FE',
        label: 'EM_FE'
      }, {
        value: 'UNKNOWN',
        label: 'UNKNOWN'
      }],
      environment_options: [{
        value: 'Stage',
        label: 'Stage'
      }, {
        value: 'Production',
        label: 'Production'
      }],
      query_environment_options: [{
        value: 'ALL',
        label: 'ALL'
      }, {
        value: 'Stage',
        label: 'Stage'
      }, {
        value: 'Production',
        label: 'Production'
      }],
		file:'',
		src:''
    }
  },

  computed: {},
  created() {
    this.getSitesTableList(true);
  },
  methods: {
    getSitesTableList(dirtyFlag) {
      this.tableLoading = true;
      if (dirtyFlag) {
        axios.get(g_server_sites_url).then(resp => {
          this.fullTableList = resp.data.list;
          this.filterData();
          this.tableLoading = false;
        });
      }
      else {
        this.filterData();
        this.tableLoading = false;
      }
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
      this.getSitesTableList(false);
    },
    reload() {
      this.getSitesTableList(true);
    },
    handleReset() {
      this.queryOperatorName = ''
      this.queryDomainId = ''
      this.queryENV = 'ALL'
      this.queryFrontend = 'ALL'
      this.getSitesTableList(false);
    },
    handleNew() {
      this.newDialogVisible = true
    },
    handleEdit(row) {
      this.openDialogType = "edit";
      this.editBeforeCallback(row);
      this.dialogVisible = true;
    },
    handleDelete(row) {
      let alertMessage = "Delete this site. domainId:" + row.domainId + ", key:" + row.key;
      this.$confirm(alertMessage, "Delete " + row.operatorName)
          .then(() => {
            axios.delete(g_server_site_url+row['key']).then(resp => {
              if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok' && resp.data['flag'] == 1) {
                this.getSitesTableList(true);
                this.$message.success("Delete successfully");
              }
              else {
                this.$message.success("Delete failed");
              }
            });
          })
          .catch(() => {
            this.$message.error("Canceled");
          })
    },
    handleUpdateTag(row) {
      this.tableLoading = true;
      axios.put(g_server_update_site_tag_url+row['key']).then(resp => {
        if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok') {
          this.getSitesTableList(true);
          this.$message.success("Update site tag successfully. spent time:" + resp.data['spent_time'] + "s");
        }
        else {
          this.$message.error("Update site tag failed. error message:" + resp.data['errorMessage']);
        }
        this.tableLoading = false;
      });
    },
    handleUpdateVersion() {
      let alertMessage = "Are you sure to sync all operator tags? it would take more than 30s";
      this.$confirm(alertMessage, "Sync tags")
          .then(() => {
            this.tableLoading = true;
            axios.get(g_server_update_version_url).then(resp => {
              if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok') {
                this.getSitesTableList(true);
                this.$message.success("Sync all operators' tags successfully. Spent time:" + resp.data['spent_time'] + "s");
              }
              else {
                this.$message.success("Sync tags failed");
              }

              this.tableLoading = false;
            });
          })
          .catch(() => {
            this.$message.error("Sync all tags cancelled");
          })
    },
	showImportDlg() {
		this.importDialogVisible = true;
		console.log(this.importDialogVisible);
	},
    onDialogConfirm() {
      this.dialogVisible = false;
      this.$refs["dialogForm"].validate((valid) => {
        if (valid) {
          axios.put(g_server_site_url+this.row['key'], this.row).then(resp => {
            if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok') {
              console.log(resp.data);
              this.dialogVisible = false;
              this.getSitesTableList(true);
              this.$message.success("Operation successfully");
            }
            else {
              this.$message.success("Operation failed");
            }
          });
        }
      });
    },

    onCloseDialog() {
      this.dialogVisible = false;
    },

    isNumeric(number) {
      let numReg = /^[0-9]*$/
      let numRe = new RegExp(numReg)
      if (!numRe.test(number)) {
        return false;
      }
      else {
        return true;
      }
    },

    onNewDialogConfirm() {
      //validate operator name
      let operatorName = this.new_site.operatorName;
      console.log(operatorName);
      if (operatorName === "" || operatorName === null || operatorName === undefined) {
        this.$message.error("Operator name can not be empty");
        return;
      }

      //validate domainId
      let domainId = this.new_site.domainId;
      if (domainId === "" || domainId === null || domainId === undefined) {
        this.$message.error("domain id is invalid. empty value");
        return;
      }

      if (domainId === 0 || domainId === '0' || !this.isNumeric(domainId)) {
        this.$message.error("domain id is invalid. incorrect domain id value domainId:" + domainId);
        return;
      }
      else {
        axios.get(g_server_site_url+this.new_site.domainId).then(resp => {
          if (resp.status == 200 && resp.statusText == 'OK') {
            if (resp.data != null) {
              this.$confirm("Site already existed under this domainId. Continue?")
                  .then(() => {
                    this.httpCreateNewSite(this.new_site);
                  })
                  .catch(() => {

                  })
            }
            else {
              this.httpCreateNewSite(this.new_site);
            }
          }
          else {
            this.$message.error("API Call failed");
          }
        });
      }
    },

    httpCreateNewSite(site) {
      site.key = site.domainId;
      axios.post(g_server_site_url+site['key'], site).then(resp => {
        if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok') {
          this.newDialogVisible = false;
          this.getSitesTableList(true);
          this.$message.success("Add a new site successfully");
        }
        else {
          this.$message.error("Add a new site failed");
        }
      });
    },

    onNewDialogClose() {
      this.newDialogVisible = false;
    },

    closeDialogBeforeCallback() {
      this.avatarUrl = "";
    },
 
    onUploadAvatarSuccess(res) {
      this.avatarUrl = res.data;
    },

    filterData(){
      let data = this.fullTableList;
      let queryOperatorName = this.queryOperatorName;
      let queryDomainId = this.queryDomainId;
      let queryENV = this.queryENV;
      let queryFrontend = this.queryFrontend;

      let rtnTableList = [];

      //Query operator name
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

      //Query domain id
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

      //Query env
      let rtnTableList3 = [];
      if(isNotEmpty(queryENV) && queryENV != 'ALL'){
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

      //Query frontend
      let rtnTableList4 = [];
      if(isNotEmpty(queryFrontend) && queryFrontend != 'ALL'){
        for (let i=0; i<rtnTableList3.length; i++)
        {
          if (isMatch(queryFrontend.toString(), rtnTableList3[i].frontend.toString())) {
            rtnTableList4.push(rtnTableList3[i]);
          }
        }
      }
      else {
        rtnTableList4 = rtnTableList3;
      }

      this.tableList =  rtnTableList4;
    },
	uploading(event){
		this.file = event.target.files[0];
		var windowURL = window.URL || window.webkitURL;
		this.file = event.target.files[0];
		this.src = windowURL.createObjectURL(event.target.files[0]);
	},
	submit(){
		event.preventDefault();
		let formdata = new FormData();
		formdata.append('file',this.file);
		let config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		};
		this.importDlgLoading = true;
		axios.post(g_server_upload_url, formdata, config).then(resp => {
			if (resp.status == 200 && resp.statusText == 'OK' && resp.data['status'] == 'ok' && resp.data['flag'] == true) {
				this.importDlgLoading = false;
				this.getSitesTableList(true);
				this.importDialogVisible = false;
				console.log(this.importDialogVisible);
				this.$message.success("Import sites from excel successfully");
			}
			else {
				this.$message.error("Import failed");
			}			
		});
	},
  }
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