<template>
  <div class="smtinstpro">
    <div class="box">
      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <!-- <el-col :span="16"> -->

        <el-form-item label="SerialNumber:" class="item">
          <el-input
            placeholder="请输入PCBID"
            clearable
            style="width: 600px"
            size="small"
            v-model="getDataText.productList"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <!-- </el-col> -->
        <el-form-item class="item"> 
          <el-button type="primary" size="small" @click="getData()"
            >OK</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-row :gutter="5">
        <el-col :span="6" :offset="0">
          <el-card shadow="always" :body-style="{ padding: '0px' }">
            <div class="left_box" :style="{ height: tableHeight + 'px' }">
              <div class="header_text">
                <span>IPQC信息</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18" :offset="0">
          <el-card shadow="always" :body-style="{ padding: '0px' }">
            <el-table
              :data="
                tableData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
              size="mini"
              :height="tableHeight"
              :header-cell-style="heardStyle"
              border
              stripe
            >
              <el-table-column
                type="index"
                :label="$t('form.serialNumber')"
                width="50"
              ></el-table-column>
              <af-table-column align="center" prop="productList" label="SN">
              </af-table-column>
              <af-table-column align="center" prop="workOrder" label="操作类型">
              </af-table-column>
              <af-table-column align="center" prop="stations" label="Text">
              </af-table-column>
              <af-table-column align="center" prop="time" label="操作时间">
              </af-table-column>
              <af-table-column align="center" prop="maintainers" label="结果">
              </af-table-column>
              <af-table-column
                align="center"
                prop="maintenanceTime"
                label="设备编码"
              >
              </af-table-column>
              <af-table-column
                align="center"
                prop="maintenanceTime"
                label="设备名称"
              >
              </af-table-column>
              <af-table-column
                align="center"
                prop="maintenanceTime"
                label="产线"
              >
              </af-table-column>
              <af-table-column
                align="center"
                prop="maintenanceTime"
                label="操作人"
              >
              </af-table-column>

              <!-- <el-table-column prop="Name" label="T-炉后AOI"> </el-table-column>
        <el-table-column prop="order" label="DIP"> </el-table-column> -->
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// import { XY_PCBAHisQTYControl } from "@/api/all";
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      getDataText: {
        workOrder: "",
        productList: "",
        startDateTime: "",
        endDateTime: "",
        lineNumber: "",
        fixedint: 0,
        operationType: "W",
      },

      lineType: [
        {
          lable: "点胶",
          value: 1,
        },
        {
          lable: "Line2",
          value: 2,
        },
        {
          lable: "Line3",
          value: 3,
        },
      ],
      tableHeight: 0,
      dialogVisible: false,
      form: {},
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      rules: {
        productList: [{ required: true, message: "请输入", trigger: "blur" }],
        workOrder: [{ required: true, message: "请输入", trigger: "change" }],
        time: [{ required: true, message: "请输入", trigger: "change" }],
        stations: [
          { required: true, message: "请选择类型", trigger: "change" },
        ],
      },
    };
  },
  watch: {
    value1(value) {
      this.getDataText.startDateTime = value[0];
      this.getDataText.endDateTime = value[1];
    },
    "getDataText.operationType"(newValue, oldValue) {
      if (newValue !== oldValue) {
        // console.log(newValue, oldValue);
        this.getDataText.workOrder = "";
        this, (this.value1 = []);
        this.getDataText.lineNumber = 0;
        this.getDataText.fixedint = 0;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 208;
    });
  },
  methods: {
    getData() {
      this.startLoading();
      XY_PCBAHisQTYControl(this.getDataText).then(({ data }) => {
        if (data.Status == "OK") {
          this.dataProse(data.DataList);
        } else {
          this.endLoading();
          this.$alert(data.Message, "错误信息", {
            confirmButtonText: "确定",
          });
        }
      });
    },
    dataProse(data) {
      let arr = [];
      data.forEach((item) => {
        const index = arr.findIndex((wo) => wo.OrderName == item.OrderName);
        if (index > -1) {
          arr[index][item.OperationName] = item.sns;
        } else {
          arr.push({
            OrderName: item.OrderName,
            [item.OperationName]: item.sns,
          });
        }
      });
      // console.log(arr);
      arr.sort((a, b) => {
        let aTime = a.OrderName.match(/\d+/g);
        let bTime = b.OrderName.match(/\d+/g);
        return aTime - bTime;
      });
      // console.log(arr);
      this.tableData = arr;
      this.endLoading();
    },
    startLoading() {
      this.loading = this.$loading({
        lock: true,
        text: "加载中~",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.2)", //调节透明度
      });
    },
    endLoading() {
      this.loading.close();
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
  },
};
</script>

<style lang="scss" scoped>
.smtinstpro {
  padding: 10px;
  
  .box {
    .item{
      margin-bottom: 10px;
    }
    // display: flex;
    // justify-content: space-between;
  }
  .left_box {
    width: 100%;
    .header_text {
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
