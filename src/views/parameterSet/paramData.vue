<template>
  <div class="box">
    <div class="head">
      <div class="item">
        <el-button type="primary" @click="dialogAdVisible = true">{{
          $t("form.add")
        }}</el-button>
      </div>
      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item">
          <el-input
            :placeholder="$t('form.pleaseEnter')"
            clearable
            v-model="getDataText.parameterName"
            class="input-with-select"
            @change="getData"
          >
            <el-button
              size="small"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :height="tableHeight"
        border
        stripe
        :header-cell-style="heardStyle"
      >
        <el-table-column
          prop="ParameterName"
          :label="$t('tableText.parameter') + $t('tableText.name')"
        >
        </el-table-column>
        <el-table-column
          prop="ParameterCode"
          :label="$t('tableText.parameter') + $t('tableText.code')"
        >
        </el-table-column>
        <el-table-column prop="update_time" :label="$t('tableText.updateTime')">
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('form.operate')"
          width="150"
          align="center"
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
    <el-dialog
      :title="$t('form.add')"
      :visible.sync="dialogAdVisible"
      width="30%"
      @close="addCancel"
    >
      <el-form :model="addForm" ref="addForm" label-width="auto" size="normal">
        <el-form-item label="参数名称" size="normal" prop="parameterName">
          <el-input v-model="addForm.parameterName"></el-input>
        </el-form-item>
        <el-form-item label="参数编码" size="normal" prop="parameterCode">
          <el-input v-model="addForm.parameterCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="参数编码" size="normal" prop="parameterCode">
          <el-input v-model="addForm.parameterCode"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDetermine()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('form.revise')"
      :visible.sync="dialogEdVisible"
      width="30%"
      @close="editCancel"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="auto"
        size="normal"
      >
        <el-form-item label="参数名称" size="normal">
          <el-input v-model="editForm.ParameterName"></el-input>
        </el-form-item>
        <el-form-item label="参数编码" size="normal">
          <el-input v-model="editForm.ParameterCode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDeter()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetParameterSettingsList,
  DeletParameterSettings,
  UpdateParameterSettings,
  ParameterSettingsAdd,
} from "@/api/all";
import { getToken } from "@/utils/auth";
import { getDateToC } from "@/utils/getDate";
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      tableData: [], //表数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableHeight: 0, //表的高度
      dialogAdVisible: false,
      dialogEdVisible: false,
      getDataText: {
        id: "",
        parameterName: "",
        parameterCode: "",
        create_time: "2024-05-28T09:46:40.039Z",
        create_uid: "",
        update_uid: "",
        OperationType: "",
        update_time: "2024-05-28T09:46:40.039Z",
      },
      addForm: {
        id: "",
        parameterName: "",
        parameterCode: "",
        create_time: "",
        create_uid: getToken(),
        update_uid: "",
        OperationType: "",
        update_time: "2024-05-28T09:46:40.039Z",
      },
      editForm: {
        OperationType: "",
      },
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
    getData() {
      GetParameterSettingsList(this.getDataText).then((res) => {
        // console.log(res);

        this.tableData = res.list || [];
      });
    },
    editCancel() {},
    editDeter() {
      this.editForm.update_time = getDateToC();
      this.editForm.update_uid = getToken();
      this.editForm.OperationType = "";
      UpdateParameterSettings(this.editForm).then((res) => {
        this.$message({
          type: "success",
          message: this.$t("message.success"),
        });
        this.dialogEdVisible = false;
        this.getData();
      });
    },
    addCancel() {
      this.dialogAdVisible = false;
      this.$refs.addForm.resetFields();
    },
    addDetermine() {
      this.addForm.create_time = getDateToC();
      this.addForm.update_time = getDateToC();
      ParameterSettingsAdd(this.addForm).then((res) => {
        this.$message({
          type: "success",
          message: this.$t("message.success"),
        });
        this.getData();
        this.dialogAdVisible = false;
        this.$refs.addForm.resetFields();
      });
    },
    handleEdit(row) {
      this.dialogEdVisible = true;
      this.editForm = row;
    },
    handleDelete(row) {
      let data = row;
      data.update_uid = getToken();
      data.OperationType = "";
      DeletParameterSettings(data).then((res) => {
        this.$message({
          type: "success",
          message: this.$t("message.success"),
        });
        this.getData();
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
        this.tableHeight = window.innerHeight - 255;
        //后面的50：根据需求空出的高度，自行调整
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 10px;
  .head {
    display: flex;
    justify-content: space-between;
    justify-items: center;
    .item {
      margin-bottom: 10px;
    }
  }
}
</style>
