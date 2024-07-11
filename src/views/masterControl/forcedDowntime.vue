<template>
  <div class="masterControl">
    <!-- <div class="box"> -->
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <!-- <div slot="header">
            <span>强制停机</span>
          </div> -->
      <div class="box_left">
        <el-form :model="form" ref="form" size="normal" :inline="true">
          <el-form-item label="线体" class="item" label-width="50px">
            <el-input
              v-model.number="form.line"
              placeholder="请输入线体"
            ></el-input>
          </el-form-item>
          <!-- <span class="state"></span> -->

          <el-form-item class="item" label-width="50px">
            <el-button type="primary" @click="addLine">{{
              $t("form.add")
            }}</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="form" :inline="true" size="normal">
          <el-form-item class="item" label-width="50px">
            <el-button plain type="primary" @click="allEnable('Y')">{{
              $t("form.enableAll")
            }}</el-button>
          </el-form-item>
          <el-form-item class="item" label-width="50px">
            <el-button plain type="danger" @click="allEnable('N')">{{
              $t("form.closeAll")
            }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          :height="tableHeight"
          border
          stripe
        >
          <af-table-column prop="LineName" :label="$t('tableText.lineName')">
          </af-table-column>

          <!-- <el-table-column prop="user" label="操作员"> </el-table-column> -->
          <el-table-column
            prop="UpdateTime"
            :label="$t('tableText.updateTime')"
          >
          </el-table-column>
          <el-table-column prop="StopActive" :label="$t('tableText.isEnabled')">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.StopActive"
                active-value="Y"
                inactive-value="N"
                @change="changeStatus(scope.row.StopActive, scope.row)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            :label="$t('form.operate')"
            width="150"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <el-button
                v-if="scope.row.StopActive == 'N'"
                type="primary"
                size="mini"
                @click="handleEnable(scope.$index, scope.row)"
                >启用</el-button
              >-->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              ></el-button>
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-time"
                @click="handleHis(scope.$index, scope.row)"
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
    <el-dialog
      :title="$t('tableText.history')"
      :visible.sync="dialogTableVisible"
      width="60%"
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
        <el-table-column prop="LineName" :label="$t('tableText.lineName')">
        </el-table-column>
        <el-table-column prop="StopActive" :label="$t('tableText.stopActive')">
          <template slot-scope="scope">
            <el-tag :type="scope.row.StopActive == 'N' ? 'info' : ''">{{
              scope.row.StopActive == "N"
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
    <!-- </div> -->
  </div>
</template>

<script>
import { LineStop } from "@/api/all";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      form: {
        line: "",
      },
      tableData: [
        // {
        //   LineName: "DIP01",
        //   StopActive: "N",
        //   UpdateTime: "2024-05-09T18:47:52",
        // },

        // {
        //   LineName: "DIP02",
        //   StopActive: "N",
        //   UpdateTime: "2024-05-09T18:40:30",
        // },

        // {
        //   LineName: "DIP03",
        //   StopActive: "N",
        //   UpdateTime: "2024-05-09T18:40:30",
        // },

        // { LineName: "S04", StopActive: "Y", UpdateTime: "2024-05-21T14:51:17" },
      ],
      tableHeight: 0,
      currentPage: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize: 10, // 每
      currentPage1: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize1: 10, // 每

      tableData1: [],
      dialogTableVisible: false,
    };
  },
  watch: {
    "form1.manner"(oldValue, newValue) {
      if (oldValue !== newValue) {
        //   console.log(1);
        this.form1.pn = "";
      }
      //   console.log(oldValue,newValue);
    },
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
      LineStop({
        activeFlag: "",
        userName: getToken(),
        lineName: "All",
        operationType: "Q",
      }).then((res) => {
        this.tableData = res.DataList;
      });
    },
    setValueNull(val) {
      this.value_ = null;
    },

    changeStatus(flag, row) {
      // console.log(a,b);
      this.onSubmit(flag, row.LineName);
    },
    onSubmit(flag, id) {
      LineStop({
        activeFlag: flag,
        userName: getToken(),
        lineName: id,
        operationType: "U",
      }).then((res) => {
        // console.log(res);
        if (res.Status == "OK") {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        }
        this.getData();
      });
    },
    addLine() {},
    allEnable(flag) {
      this.onSubmit(flag, "All");
    },
    handleEnable(index, row) {
      // console.log(index,row);
      this.onSubmit("Y", row.LineName);
    },
    handleClose(index, row) {
      this.onSubmit("N", row.LineName);
    },
    handleHis(index, row) {
      LineStop({
        activeFlag: "",
        userName: "",
        lineName: row.LineName,
        operationType: "QH",
      }).then((res) => {
        this.tableData1 = res.DataList;
        this.tableData1.reverse();
        this.dialogTableVisible = true;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage1 = 1;
      this.pageSize1 = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
    },
    getScreenHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 225;

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
  .box_left {
    display: flex;
    justify-content: space-between;
  }
  .item {
    margin-bottom: 10px;
  }
  .state {
    //   margin-left: 20px;
    display: inline-block;
    border-radius: 999px;
    width: 30px;
    height: 30px;
    background: rgb(182, 182, 182);
  }
  // .header_box {
  //   display: flex;
  //   gap: 10px;
  //   .box {
  //     flex: 1;
  .box {
    //    height: 100vh;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  // }
  // }
}
</style>
