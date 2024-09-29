<template>
  <div class="masterControl">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div class="box">
        <el-form
          :model="form"
          ref="form"
          :inline="true"
          size="normal"
        >
          <!-- <el-form-item :label="$t('tableText.type')">
            <el-select
              v-model="form.type"
              @change="change"
              filterable
              :placeholder="$t('form.pleaseSelect') + $t('tableText.type')"
            >
              <el-option
                v-for="item in controlType"
                :key="item.id"
                :label="$t(item.lable)"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('form.workOrder')">
            <el-input
              v-model="workorder"
              placeholder="请输入工单"
              size="normal"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="item"
            label="PCB"
            v-if="form.type == 'pcb'"
            prop="pcbID"
          >
            <el-input v-model="form.pcbID" size="normal"></el-input>
          </el-form-item>

          <el-form-item class="item">
            <el-button type="primary" @click="getData()">{{
              $t("form.inquire")
            }}</el-button>
          </el-form-item>
          <!-- <el-form-item class="item">
          <el-button  @click="change2(form.id)">{{
            $t("form.inquire")
          }}</el-button>
        </el-form-item> -->
        </el-form>
        <!-- <div>
          <el-input
            :placeholder="$t('form.pleaseEnter') + $t('form.productList')"
            clearable
            v-model="dataID"
            class="input-with-select"
            @change="change2(dataID)"
            @keyup.enter.native="change2(dataID)"
          >
            <el-button
              @click="change2(dataID)"
              size="small"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div> -->
      </div>

      <div>
        <el-table :data="
          tableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )" :height="tableHeight" border stripe>
          <!-- <el-table-column prop="type"   :label="$t('tableText.category')"> </el-table-column> -->
          <el-table-column v-if="form.type == 'pcb'" prop="PcbID" label="PCB">
          </el-table-column>
          <el-table-column prop="WorkOrder" :label="$t('form.WorkOrder')">
          </el-table-column>
          <el-table-column prop="ProductName" :label="$t('form.ProductName')">
          </el-table-column>
          <el-table-column prop="OrderQTY" :label="$t('form.OrderQTY')">
          </el-table-column>

          <el-table-column prop="FCTPass" :label="$t('form.FCTPass')">
          </el-table-column>
          <el-table-column prop="FCTFail" :label="$t('form.FCTFail')">
          </el-table-column>
          <el-table-column :label="$t('form.FCT1stYield')+'(%)'">
            <template slot-scope="scope">
              <div>{{ scope.row.FCT1stYield === 'NaN' ? '':scope.row.FCT1stYield }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('form.FCTYield')+'(%)'">
            <template slot-scope="scope">
              <div>{{ scope.row.FCTYield === 'NaN' ? '':scope.row.FCTYield }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <!-- card body -->
    </el-card>
  </div>
</template>

<script>
import {
  BasicData,
  OrderStop,
  ProductStop,
  PcbStopdd,
  GetPcbStopList,
  UpdatePcbStop,
  DeletPcbStop,
  Prod_FCTInquiry,
} from "@/api/all";
import { getToken } from "@/utils/auth";
import { getDate } from "@/utils/getDate";

export default {
  data() {
    return {
      form: {
        type: "QW",
        id: "",
        name: "",
        pcbID: "",
      },
      dataID: "",
      pcbID: "",
      tableData: [],
      tableData1: [],
      currentPage: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize: 10, // 每
      currentPage1: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize1: 10,
      tableHeight: 0,
      value: "",
      dialogTableVisible: false,
      form1: {
        manner: "",
        pn: "",
      },
      controlType: [
        {
          id: "QP",
          lable: "tableText.product",
        },
        {
          id: "QW",
          lable: "tableText.order",
        },
        {
          id: "pcb",
          lable: "tableText.pcb",
        },
      ],
      itemList: [],
      workorder: "",
    };
  },
  watch: {},
  computed: {},
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
      if (this.workorder === "") {
        return;
      }
      Prod_FCTInquiry({
        workorder: this.workorder,
      }).then((res) => {
        if (res.Status === "OK") {
          this.tableData = [res.DataList]
          // console.log(res.DataList);
          
        }
      });
    },
    change(value) {
      if (value == "pcb") {
        return;
      }
      BasicData({
        operationType: value,
      }).then((res) => {
        this.itemList = res.DataList.map((item) => {
          return {
            number: item.PartNumber || item.OrderNumber,
            name: item.Name || "",
          };
        });
      });
    },
    change1(id) {
      if (this.form.type == "QP") {
        let productName = this.itemList.find((item) => id == item.number);
        this.form.name = productName.name;
        // console.log(  this.form.name );
      }
    },
    change2(id) {
      // console.log(this.form.type);
      if (this.form.type == "QP") {
        ProductStop({
          userName: getToken(),
          updateid: getToken(),
          productName: this.form.name,
          productID: id,
          updateTime: "2024-06-03T06:12:38.184Z",
          operationType: "Q",
        }).then((res) => {
          this.tableData = res.list;
        });
      }
      if (this.form.type == "QW") {
        OrderStop({
          updateid: getToken(),
          orderName: id,
          stopActive: "N",
          productID: id,
          productName: id,
          updateTime: "2024-06-03T06:12:38.184Z",
          operationType: "Q",
        }).then((res) => {
          this.tableData = res.list;
        });
      }
      if (this.form.type == "pcb") {
        GetPcbStopList({
          pcbID: id,
          pcbName: "",
          status: "",
          ProductID: "",
          ProductName: "",
          updateTime: "2024-05-30T02:34:33.971Z",
          updateid: getToken(),
          operationType: "",
        }).then((res) => {
          if (res.list == null) {
            this.tableData = [];
          } else {
            this.tableData = res.list;
          }
        });
      }
    },
    clear() {
      this.change2("");
    },
    changeStatus(row) {
      // console.log(a,b);
      if (this.form.type == "pcb") {
        // console.log(row);
        let data = { ...row, updateid: getToken(), OperationType: "" };
        console.log(data);
        UpdatePcbStop(data).then((res) => {
          if (res.ResultCode == 200) {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
          }
          this.getData();
        });
      } else {
        let data = { ...row, updateid: getToken(), operationType: "U" };
        this.updata(data);
        // console.log(1);
        // this.onSubmit(flag, row.OrderName || row.ProductID, "U");
      }
    },
    updata(data) {
      if (this.form.type == "QW") {
        OrderStop(data).then((res) => {
          // console.log(res);
          if (res.ResultCode == 200) {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
          }
          this.getData();
        });
      } else {
        ProductStop(data).then((res) => {
          // console.log(res);
          if (res.ResultCode == 200) {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
          }
          this.getData();
        });
      }
    },
    onSubmit(id, type) {
      // console.log(this.pcbID);
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.type == "QP") {
            // console.log(111);
            ProductStop({
              userName: getToken(),
              updateid: getToken(),
              stopActive: "N",
              productName: this.form.name,
              productID: id,
              updateTime: "2024-06-03T06:12:38.184Z",
              operationType: type,
            }).then((res) => {
              // console.log(res);
              if (res.ResultCode == 200) {
                this.$refs.form.resetFields();
                this.$message({
                  type: "success",
                  message: this.$t("message.success"),
                });
              }
              this.getData();
            });
          }

          if (this.form.type == "QW") {
            OrderStop({
              updateid: getToken(),
              orderName: id,
              stopActive: "N",
              productID: id,
              productName: id,
              updateTime: "2024-06-03T06:12:38.184Z",
              operationType: type,
            }).then((res) => {
              // console.log(res);
              if (res.ResultCode == 200) {
                this.$refs.form.resetFields();
                this.$message({
                  type: "success",
                  message: this.$t("message.success"),
                });
              }
              this.getData();
            });
          }
          if (this.form.type == "pcb") {
            PcbStopdd({
              pcbID: this.form.pcbID,
              pcbName: "",
              status: "N",
              updateTime: "2024-05-30T02:21:50.794Z",
              updateid: getToken(),
              ProductID: "",
              ProductName: "",
              operationType: "",
            }).then((res) => {
              // console.log(res);
              if (res.ResultCode == 200) {
                this.$refs.form.resetFields();
                this.$message({
                  type: "success",
                  message: this.$t("message.success"),
                });
              }
              this.getData();
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });

      // console.log(flag,id);
    },
    handleEnable(index, row) {
      // console.log(index,row);
      this.onSubmit("Y", row.OrderName || row.ProductID, "U");
    },
    handleClose(index, row) {
      // console.log(index,row);
      this.onSubmit("N", row.OrderName || row.ProductID, "U");
    },
    handleDelete(row) {
      if (this.form.type == "pcb") {
        let data = { ...row, operationType: "" };
        DeletPcbStop(data).then((res) => {
          if (res.ResultCode == 200) {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
          }
          this.tableData = [];
          this.getData();
        });
      }

      if (this.form.type == "QW") {
        let data = { ...row, operationType: "D", updateid: getToken() };
        OrderStop(data).then((res) => {
          if (res.ResultCode == 200) {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
          }
          this.getData();
        });
      }
      if (this.form.type == "QP") {
        let data = { ...row, operationType: "D", updateid: getToken() };
        ProductStop(data).then((res) => {
          if (res.ResultCode == 200) {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
          }
          this.getData();
        });
      }
    },
    //历史记录查询
    handleHis(row) {
      if (this.form.type == "QP") {
        ProductStop({
          updateid: getToken(),
          productName: this.form.name,
          productID: row.ProductID,
          updateTime: "2024-06-03T06:12:38.184Z",
          operationType: "QH",
        }).then((res) => {
          this.tableData1 = res.list;
          this.tableData1.reverse();
          this.dialogTableVisible = true;
        });
      }
      if (this.form.type == "QW") {
        OrderStop({
          activeFlag: "",
          userName: getToken(),
          orderName: row.OrderName,
          operationType: "QH",
          updateid: "",
        }).then((res) => {
          this.tableData1 = res.DataList;
          this.tableData1.reverse();
          this.dialogTableVisible = true;
        });
      }
      if (this.form.type == "QW") {
        OrderStop({
          activeFlag: "",
          userName: getToken(),
          orderName: row.OrderName,
          operationType: "QH",
          updateid: "",
        }).then((res) => {
          this.tableData1 = res.DataList;
          this.tableData1.reverse();
          this.dialogTableVisible = true;
        });
      }
      if (this.form.type == "pcb") {
        console.log(row);
        GetPcbStopList({
          pcbID: row.PcbID,
          pcbName: "",
          status: "0",
          updateTime: "2024-05-30T02:21:50.794Z",
          updateid: getToken(),
          operationType: "QH",
        }).then((res) => {
          this.tableData1 = res.list;
          this.tableData1.reverse();
          this.dialogTableVisible = true;
        });
      }
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
    // 时间戳：1637244864707
    /* 时间戳转换为时间 */
    timestampToTime(timestamp) {
      timestamp = timestamp ? timestamp : null;
      let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
};
</script>

<style lang="scss" scoped>
.masterControl {
  padding: 10px;

  .item {
    margin-bottom: 10px;
  }
  .box {
    display: flex;
    justify-content: space-between;
    //  align-items: center;
    .input-with-select {
      width: 300px;
    }
  }
  .state {
    //   margin-left: 20px;
    display: inline-block;
    border-radius: 999px;
    width: 30px;
    height: 30px;
    background: rgb(182, 182, 182);
  }
}
</style>
