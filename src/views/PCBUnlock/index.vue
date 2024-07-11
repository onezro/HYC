<template>
  <div class="smtinstpro">
    <div class="box">
      <!-- <el-form ref="form" class="form" :inline="true" :model="getDataText">
       

        <el-form-item label="SerialNumber" class="item"> -->
      <div>
        <el-input
          placeholder="请输入PCBID"
          clearable
          style="width: 400px"
          v-model="getDataText.seiralNumber"
          @change.native="getData()"
        >
        </el-input>
           <el-button type="primary" @click="getData()">OK</el-button>
      </div>

      <!-- </el-form-item>
       
        <el-form-item class="item">
          <el-button type="primary" @click="getData()">OK</el-button>
        </el-form-item>
      </el-form> -->
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
            <div class="table">
              <el-table
                :data="
                  tableData.slice(
                    (currentPage - 1) * pageSize,
                    currentPage * pageSize
                  )
                "
                :height="tableHeight"
                size="mini"
                :header-cell-style="heardStyle"
                border
                stripe
              >
                <el-table-column
                  prop="OrderNumber"
                  label="工单"
                ></el-table-column>
                <el-table-column prop="AssemblyName" label="产品料号">
                </el-table-column>
                <el-table-column prop="Name" label="PCB ID"> </el-table-column>
                <!-- <el-table-column prop="OperationID" label="制程ID"> </el-table-column> -->
                <el-table-column prop="OperatorName" label="制程名称">
                </el-table-column>
                <af-table-column prop="LineName" label="线体">
                </af-table-column>
                <af-table-column prop="EquipmentCode" label="设备编号">
                </af-table-column>
                <el-table-column prop="EquipmentName" label="设备名称">
                </el-table-column>
                <el-table-column prop="DateTime" label="过站时间">
                </el-table-column>
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
              <div class="block" style="margin-top: 10px">
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
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { PCBAHisControl } from "@/api/all";
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      getDataText: {
        seiralNumber: "",
        workOrder: "",
        operationType: "S",
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

    getScreenHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 250;
        //后面的50：根据需求空出的高度，自行调整
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
  },
};
</script>

<style lang="scss" scoped>
.smtinstpro {
  padding: 10px;

  .box {
    margin-bottom: 10px;
    .item {
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
