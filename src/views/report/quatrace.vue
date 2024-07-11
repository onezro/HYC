<template>
  <div class="smtinstpro">
    <div>
      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item">
          <el-select v-model="getDataText.operationType" placeholder="检查类型">
            <el-option
              v-for="item in inquireList"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="item" v-show="getDataText.operationType == 'W'">
          <el-input
            placeholder="请输入单号"
            clearable
            style="width: 400px"
            v-model="getDataText.workOrder"
            class="input-with-select"
            @change="getData()"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="item" v-show="getDataText.operationType != 'W'">
          <el-input
            placeholder="请输入seiralNumber"
            clearable
            style="width: 400px"
            v-model="getDataText.seiralNumber"
            class="input-with-select"
            @change="getData()"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-button type="primary" @click="getData()">查询</el-button>
        </el-form-item>
        <!-- <el-form-item class="item">
          <el-button type="primary" @click="outputFile()">导出</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        id="Table1"
        :height="tableHeight"
        size="mini"
        :header-cell-style="heardStyle"
        border
        stripe
      >
        <el-table-column prop="OrderNumber" :label="$t('form.workOrder')"></el-table-column>
        <el-table-column prop="AssemblyName" label="产品料号">
        </el-table-column>
        <el-table-column prop="Name" label="PCB ID"> </el-table-column>
        <!-- <el-table-column prop="OperationID" label="制程ID"> </el-table-column> -->
        <el-table-column prop="OperatorName" label="制程名称">
        </el-table-column>
        <el-table-column prop="LineName" label="线体"> </el-table-column>
        <el-table-column prop="EquipmentCode" label="设备编号">
        </el-table-column>
        <el-table-column prop="EquipmentName" label="设备名称">
        </el-table-column>
        <el-table-column prop="DateTime" label="过站时间"> </el-table-column>
        <!-- <el-table-column prop="order" label="状态"> </el-table-column> -->
        <el-table-column prop="StatusCODE" align="center" label="状态">
          <template slot-scope="scope">
            <el-tag
              effect="dark"
              :type="scope.row.StatusCODE !== 'PASS' ? 'info' : ''"
              >{{ scope.row.StatusCODE }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 15px">
        <el-pagination
          align="center"
          background
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
  </div>
</template>

<script>
import { PCBAHisControl } from "@/api/all";
import FileSaver from "file-saver";
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      tableData: [],
      getDataText: {
        seiralNumber: "",
        workOrder: "",
        operationType: "S",
      },
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableHeight: 0,
      inquireList: [
        {
          lable: "工单号",
          value: "W",
        },
        {
          lable: "PCBA码",
          value: "S",
        },
      ],
    };
  },
  watch: {
    "getDataText.operationType"(newValue) {
      if (newValue == "W") {
        this.getDataText.seiralNumber = "";
      } else {
        this.getDataText.workOrder = "";
      }
    },
  },

  beforeMount() {
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  methods: {
    getData() {
      // this.startLoading();
      PCBAHisControl(this.getDataText).then((res) => {
        // console.log(data);
        // this.endLoading();
        this.tableData = res.list;

        this.tableData.sort((a, b) => {
          let aTime = new Date(a.DateTime);
          let bTime = new Date(b.DateTime);
          return aTime - bTime;
        });
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    getScreenHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 210;
        //后面的50：根据需求空出的高度，自行调整
      });
    },
    outputFile() {
      this.pageSize = this.tableData.length;
      this.$nextTick(function () {
        var ws1 = XLSX.utils.table_to_book(document.querySelector("#Table1")); //对应要导出的表格id

        /* get binary string as output */
        var wbOut = XLSX.write(ws1, {
          bookType: "xlsx",
          bookSST: true,
          type: "array",
        });
        try {
          FileSaver.saveAs(
            new Blob([wbOut], { type: "application/octet-stream" }),
            "result.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbOut);
        }
        this.pageSize = 10; //表格还原
        return wbOut;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.smtinstpro {
  padding: 10px;

  .form {
    .item {
      margin-bottom: 10px;
    }
    //    display: flex;
    //     justify-content: flex-end;
  }
}
</style>
