<template>
  <div class="masterControl">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <el-form :model="form" ref="form" :inline="true" size="normal">
        <el-form-item :label="$t('tableText.device')">
          <el-select
            v-model="mcId"
            @change="change"
            filterable
            :placeholder="$t('form.pleaseSelect') + $t('tableText.device')"
          >
            <el-option
              v-for="item in machineType"
              :key="item.AssetNumber"
              :label="item.Name"
              :value="item.AssetNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.parameter')" class="myselect">
          <el-select
            v-model="form.mcParameterKey"
            filterable
            :placeholder="$t('form.pleaseSelect') + $t('tableText.parameter')"
          >
            <el-option
              v-for="item in parameterList"
              :key="item.McParameterKey"
              :label="item.McSettingDes"
              :value="item.McParameterKey"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.stopActive')">
          <el-switch
            v-model="form.mcParameterStatus"
            active-value="Y"
            inactive-value="N"
          >
          </el-switch>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" @click="change(mcId)">{{
            $t("form.inquire")
          }}</el-button>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" @click="onSubmit(mcId)">{{
            $t("form.add")
          }}</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-table :data="tableData" :height="tableHeight" border stripe>
          <el-table-column prop="McId" :label="$t('tableText.device')">
            <template slot-scope="scope">
              {{ deviceName(scope.row.McId) }}
            </template>
          </el-table-column>
          <af-table-column
            prop="McParameterKey"
            :label="$t('tableText.parameter')"
          >
            <!-- <template slot-scope="scope">
              <div class="choosesw">
                <el-switch
                  v-model="scope.row.isWorder"
                  @change="handleStatusChange(scope.row)"
                  active-text="是否当前工单"
                >
                </el-switch>
                <el-switch v-model="value2" active-text="工单产品"> </el-switch>
                <el-switch v-model="value3" active-text="生命周期"> </el-switch>
                <el-switch v-model="value4" active-text="前工序时间">
                </el-switch>
              </div>
            </template> -->
          </af-table-column>
          <af-table-column
            prop="UpdateTime"
            :label="$t('tableText.updateTime')"
          >
          </af-table-column>
          <el-table-column
            prop="McParameterStatus"
            :label="$t('tableText.stopActive')"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.McParameterStatus"
                active-value="Y"
                inactive-value="N"
                @change="changeStatus(scope.row.McParameterStatus, scope.row)"
              >
              </el-switch>
              
            </template>
          </el-table-column>
          <!-- <af-table-column prop="user" label="操作人"> </af-table-column> -->

          <el-table-column
            fixed="right"
            :label="$t('tableText.operate')"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <el-button
                v-if="scope.row.McParameterStatus == 'N'"
                type="primary"
                size="mini"
                @click="handleEnable(scope.row)"
                >启用</el-button
              >
              <el-button
                v-if="scope.row.McParameterStatus == 'Y'"
                type="danger"
                size="mini"
                @click="handleClose(scope.row)"
                >关闭</el-button
              > -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-time"
                size="mini"
                @click="handleHis(scope.row)"
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

      <!-- card body -->
    </el-card>
    <!-- </div> -->
    <el-dialog
      :title="$t('tableText.history')"
      :visible.sync="dialogTableVisible"
      width="50%"
    >
      <el-table
        :data="
          tableData1.slice(
            (currentPage1 - 1) * pageSize1,
            currentPage1 * pageSize1
          )
        "
        max-height="500"
        border
        stripe
        class="tableAuto"
        style="width: 100%"
      >
        <el-table-column prop="McId" :label="$t('tableText.device')">
          <template slot-scope="scope">
            {{ deviceName(scope.row.McId) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="McParameterStatus"
          :label="$t('tableText.stopActive')"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.McParameterStatus == 'N' ? 'info' : ''">{{
              scope.row.McParameterStatus == "N"
                ? $t("tableText.shutDown")
                : $t("tableText.enable")
            }}</el-tag>
            <!-- <span>{{ scope.row.Result == "PASS"? "良品" : "不良品" }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="user" :label="$t('tableText.user')">
        </el-table-column>
        <el-table-column prop="UpdateTime" :label="$t('tableText.updateTime')">
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 15px">
        <el-pagination
          background
          align="center"
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="currentPage1"
          :page-size="pageSize1"
          :page-sizes="[5, 10, 20, 50, 100]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="tableData1.length"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { BasicData, McSetting } from "@/api/all";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      mcId: "",
      form: {
        mcId: 0,
        mcParameterKey: "",
        mcSettingDes: "",
        mcParameterStatus: "Y",
        userName: getToken(),
        operationType: "I",
      },
      tableData: [
        {
          McId: 1103,
          McParameterKey: "工序节拍",
          McParameterStatus: "Y",
          McSettingDes: "",
          UpdateTime: "2024-05-23T14:30:03",
        },
         {
          McId: 1103,
          McParameterKey: "异常处理",
          McParameterStatus: "Y",
          McSettingDes: "",
          UpdateTime: "2024-05-21T14:30:03",
        },
          {
          McId: 1103,
          McParameterKey: "样品板",
          McParameterStatus: "Y",
          McSettingDes: "",
          UpdateTime: "2024-05-21T14:30:03",
        },
      ],
      currentPage: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize: 10, // 每
      tableHeight: 0,
      currentPage1: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize1: 10, // 每
      tableData1: [],
      dialogTableVisible: false,
      itemList: [],
      machineType: [
        {AssetNumber: "1103", Name: "MPN"},
        {AssetNumber: "1205", Name: "SPI"},
        {AssetNumber: "1204", Name: "MPN-W3"},
      ],
      parameterList: [],
      checkList: [],
    };
  },
  watch: {
    mcId(oldValue, newValue) {
      if (oldValue !== newValue) {
        this.tableData = [];
        this.form.mcParameterKey = "";
      }
    },
  },

  beforeMount() {
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
    // this.getBaisData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  methods: {
    deviceName(id) {
      let decice = this.machineType.find(
        ({ AssetNumber }) => id == AssetNumber
      );
      return decice.Name;
    },
    getBaisData() {
      BasicData({ operationType: "QA" }).then((res) => {
        // console.log(res);
        this.machineType = res.DataList;
        BasicData({ operationType: "QM" }).then((res) => {
          // console.log(res);
          this.checkList = res.DataList;
        });
      });
    },
    getData(id) {
      McSetting({
        mcId: id,
        mcParameterKey: "",
        mcSettingDes: "",
        mcParameterStatus: "",
        userName: "",
        operationType: "Q",
      })
        .then((res) => {
          // console.log(res);
          // if (res.status == "OK") {
          this.tableData = res.DataList;
          this.parameterList = this.checkList.filter((item) => {
            if (
              this.tableData.findIndex(
                ({ McParameterKey }) => item.McParameterKey == McParameterKey
              ) == -1
            ) {
              return item;
            }
          });
        })
        .catch((ree) => {
          this.tableData = [];
          this.parameterList = this.checkList;
        });
    },
    change(data) {
      let mcId = parseInt(data);
      this.getData(mcId);
      this.form.mcId = mcId;
    },
    onSubmit(id) {
      // console.log(this.form);
      // this.form.mcParameterStatus = "Y";
      McSetting(this.form).then((res) => {
        this.$message({
          type: "success",
          message: this.$t("message.success"),
        });
        this.form.mcParameterKey = "";

        this.getData(id);
      });
    },
    changeStatus(flag, row) {
      // console.log(a,b);
      let mcId = parseInt(row.McId);
      McSetting({
        mcId: mcId,
        mcParameterKey: row.McParameterKey,
        mcSettingDes: "",
        mcParameterStatus: flag,
        userName: getToken(),
        operationType: "U",
      }).then((res) => {
        if (res.Status == "OK") {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
        }
        this.getData(mcId);
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
          let mcId = parseInt(row.McId);
          McSetting({
            mcId: mcId,
            mcParameterKey: row.McParameterKey,
            mcSettingDes: "",
            mcParameterStatus: "",
            userName: getToken(),
            operationType: "D",
          }).then((res) => {
            if (res.Status == "OK") {
              this.$message({
                type: "success",
                message: this.$t("message.success"),
              });
            }
            this.getData(mcId);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.Cancel"),
          });
        });
    },
    handleHis(row) {
      McSetting({
        mcId: row.McId,
        mcParameterKey: row.McParameterKey,
        mcSettingDes: "",
        mcParameterStatus: "",
        userName: "",
        operationType: "QH",
      }).then((res) => {
        this.tableData1 = res.DataList;
        this.tableData1.reverse();
        this.dialogTableVisible = true;
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
    handleSizeChange1(val) {
      this.currentPage1 = 1;
      this.pageSize1 = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
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
.masterControl {
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

  // .header_box {
  //   display: flex;
  //   gap: 10px;
  //   .box {
  //     flex: 1;

  // }
  // }
}
</style>
