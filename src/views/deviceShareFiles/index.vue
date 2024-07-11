<template>
  <div class="deviceParam">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div class="header_box">
        <el-button type="primary" @click="dialogVisible = true">{{
          $t("form.add")
        }}</el-button>
        <el-input
          placeholder=""
          clearable
          v-model="getDataText.C_Type"
          class="input-with-select"
          @change="getSearchData"
        >
          <el-button
            size="small"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>

      <div>
        <el-table :data="tableData" :height="tableHeight" border stripe>
          <el-table-column prop="C_Type" :label="$t('tableText.deviceType')">
          </el-table-column>
          <el-table-column prop="C_IP" :label="$t('tableText.device') + 'IP'">
          </el-table-column>
          <af-table-column prop="C_Path" :label="$t('tableText.sharedFolders')">
          </af-table-column>
          <el-table-column prop="C_User" :label="$t('tableText.username')">
          </el-table-column>
          <el-table-column
            prop="C_Pwd"
            :label="$t('tableText.password')"
          ></el-table-column>
          <el-table-column
            prop="C_IsEnabled"
            :label="$t('tableText.isEnabled')"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.C_IsEnabled"
                :active-value="1"
                :inactive-value="0"
                @change="changeStatus(scope.row.C_IsEnabled, scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <!-- <af-table-column prop="user" label="操作人"> </af-table-column> -->
          <el-table-column
            fixed="right"
            :label="$t('form.operate')"
            align="center"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 15px">
          <el-pagination
            background
            align="center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[5, 10, 20, 50, 100]"
            layout="total,sizes, prev, pager, next, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog
      :title="$t('form.add')"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="form"
        ref="form"
        :inline="false"
        label-width="auto"
        size="normal"
      >
        <el-form-item :label="$t('tableText.deviceType')" prop="C_Type">
          <el-input
            v-model="form.C_Type"
            :placeholder="'请输入' + $t('tableText.deviceType')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.device') + 'IP'" prop="C_IP">
          <el-input
            v-model="form.C_IP"
            :placeholder="'请输入' + $t('tableText.device') + 'IP'"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.sharedFolders')" prop="C_Path">
          <el-input
            v-model="form.C_Path"
            type="textarea"
            :placeholder="'请输入' + $t('tableText.sharedFolders')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.username')" prop="C_User">
          <el-input
            v-model="form.C_User"
            :placeholder="'请输入' + $t('tableText.username')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.password')" prop="C_Pwd">
          <el-input
            v-model="form.C_Pwd"
            :placeholder="'请输入' + $t('tableText.password')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.isEnabled')" prop="C_IsEnabled">
          <el-switch
            v-model="form.C_IsEnabled"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">{{ $t("form.cancel") }}</el-button>
        <el-button type="primary" @click="addDetermine()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('form.revise')"
      :visible.sync="dialogEditVisible"
      width="30%"
      @close="editCancel()"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :inline="false"
        label-width="auto"
        size="normal"
      >
        <el-form-item :label="$t('tableText.deviceType')" prop="C_Type">
          <el-input
            v-model="editForm.C_Type"
            :placeholder="'请输入' + $t('tableText.deviceType')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.device') + 'IP'" prop="C_IP">
          <el-input
            v-model="editForm.C_IP"
            :placeholder="'请输入' + $t('tableText.device') + 'IP'"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.sharedFolders')" prop="C_Path">
          <el-input
            v-model="editForm.C_Path"
            type="textarea"
            :placeholder="'请输入' + $t('tableText.sharedFolders')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.username')" prop="C_User">
          <el-input
            v-model="editForm.C_User"
            :placeholder="'请输入' + $t('tableText.username')"
          ></el-input>
        </el-form-item>

        <el-form-item :label="$t('tableText.password')" prop="C_Pwd">
          <el-input
            v-model="editForm.C_Pwd"
            :placeholder="'请输入' + $t('tableText.password')"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancel()">{{ $t("form.cancel") }}</el-button>
        <el-button type="primary" @click="editDetermine()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  ListConfiguration,
  DelectConfiguration,
  UpdateConfiguration,
  SaveConfiguration,
} from "@/api/mjs";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      mcId: "",
      getDataText: {
        C_Type: "",
      },
      form: {
        ID: "",
        C_Type: "",
        C_IP: "",
        C_Path: "",
        C_IsEnabled: 1,
        create_uid: getToken(),
        create_time: "",
        update_uid: "",
        update_time: "",
        field1: "",
        field3: "",
        C_User: "",
        C_Pwd: "",
      },
      editForm: {},
      tableData: [],
      currentPage: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize: 10, // 每
      tableHeight: 0,
      dialogVisible: false,
      dialogEditVisible: false,
    };
  },

  beforeMount() {
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
    this.getData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  methods: {
    getSearchData() {
      ListConfiguration(this.getDataText).then((res) => {
        this.tableData = res.list;
      });
    },
    getData() {
      ListConfiguration({
        ID: "",
        C_Type: "",
        C_IP: "",
        C_Path: "",
        C_IsEnabled: "",
        create_uid: "",
        create_time: "",
        update_uid: "",
        update_time: "",
        field1: "",
        field3: "",
        C_User: "",
        C_Pwd: "",
      }).then((res) => {
        // console.log(res);
        // if (res.ResultCode == 200) {
          this.tableData = res.list;
        // } else {

        // }
      });
    },
    onSubmit() {
      // console.log(this.form);
    },
    changeStatus(flag, row) {
      // console.log(flag, row);
      UpdateConfiguration(row).then((res) => {
        // console.log(res);
        // this.getData();
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
        }
      });
    },
    handleEdit(row) {
      // console.log(row);
      this.dialogEditVisible = true;
      this.editForm = row;
    },
    addCancel() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
    addDetermine() {
      SaveConfiguration(this.form).then((res) => {
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
          this.dialogVisible = false;
          this.$refs.form.resetFields();
        }
      });
    },
    editCancel() {
      this.dialogEditVisible = false;
      this.$refs.editForm.resetFields();
    },
    editDetermine() {
      this.editForm.update_uid = getToken();
      UpdateConfiguration(this.editForm).then((res) => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
          this.dialogEditVisible = false;
        }
      });
    },
    handleDelete(row) {
      this.$confirm(
        this.$t("form.confirm") + this.$t("form.delete"),
        this.$t("form.confirm") + this.$t("form.operate"),
        {
          confirmButtonText: this.$t("form.confirm"),
          cancelButtonText: this.$t("form.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          DelectConfiguration(row).then((res) => {
            this.getData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.Cancel"),
          });
        });
    },

    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    getScreenHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 240;

        //后面的50：根据需求空出的高度，自行调整
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deviceParam {
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  .choosesw {
    display: flex;
    // align-items: center;
    flex-direction: column;
    gap: 10px;
  }

  .header_box {
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    .input-with-select {
      width: 300px;
    }
  }
}
</style>
