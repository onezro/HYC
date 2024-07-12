<template>
  <div class="smtinstpro">
    <div class="box">
      <div class="item">
        <el-button type="primary" @click="openAdd">{{
          $t("form.add")
        }}</el-button>
      </div>

      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item">
          <el-input
            :placeholder="$t('form.pleaseEnter') + $t('form.productList')"
            clearable
            v-model="getDataText.productID"
            class="input-with-select"
              @change="getData"
          >
          </el-input>
             <el-button
          @click="getData"
          size="small"
          slot="append"
          icon="el-icon-search"
        ></el-button>
          <!-- <el-select
            v-model="getDataText.productName"
            filterable
            @change="getData()"
            :placeholder="$t('tableText.type')"
          >
            <el-option
              v-for="item in partList"
              :key="item.PartNumber"
              :label="item.PartNumber"
              :value="item.PartNumber"
            ></el-option>
          </el-select> -->
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            :placeholder="$t('form.pleaseEnter') + $t('form.workOrder')"
            clearable
            v-model="getDataText.workOrder"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="getDataText.lineNumber"
            :placeholder="$t('form.pleaseEnter') + $t('form.stations')"
          >
            <el-option
              v-for="item in lineType"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="item">
          <el-button type="primary" @click="getData()">{{
            $t("form.inquire")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :height="tableHeight"
        :header-cell-style="heardStyle"
        border
        stripe
      >
        <el-table-column type="index" align="center"></el-table-column>
        <af-table-column
          align="center"
          prop="ProductID"
          :label="$t('form.productNum')"
        >
        </af-table-column>
        <af-table-column
          align="center"
          prop="ProductName"
          :label="$t('form.productList') + $t('tableText.name')"
        >
        </af-table-column>
        <af-table-column
          align="center"
          prop="PreOperationName"
          :label="$t('form.stations')"
        >
        </af-table-column>
        <af-table-column
          align="center"
          prop="CycleTime"
          :label="$t('tableText.delayTime')"
        >
        </af-table-column>
        <af-table-column
          align="center"
          prop="PostOperationName"
          :label="$t('form.endions')"
        >
        </af-table-column>
        <el-table-column
          align="center"
          prop="CompareRules"
          :label="$t('tableText.regulation')"
        >
          <template slot-scope="scope">
            <!-- <el-tag :type="scope.row.CompareRules == 'B' ? 'info' : ''">{{
              scope.row.CompareRules == "N"
                ? $t("tableText.shutDown")
                : $t("tableText.enable")
            }}</el-tag> -->
            <span>{{ scope.row.CompareRules == "B" ? "大于" : "小于" }}</span>
          </template>
        </el-table-column>
        <af-table-column
          align="center"
          prop="UpdateTime"
          :label="$t('tableText.updateTime')"
        >
        </af-table-column>
        <el-table-column
          fixed="right"
          :label="$t('form.operate')"
          width="200"
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
        <!-- <el-table-column prop="Name" label="T-炉后AOI"> </el-table-column>
        <el-table-column prop="order" label="DIP"> </el-table-column> -->
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
    <el-dialog
      :title="$t('form.add')"
      @close="addCancel()"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-form-item :label="$t('tableText.product')" prop="productID">
          <div class="box">
            <el-select
              v-model="form.productID"
              filterable
              @change="change"
              :placeholder="$t('form.pleaseSelect') + $t('tableText.product')"
            >
              <el-option
                v-for="item in partList"
                :key="item.PartNumber"
                :label="item.PartNumber"
                :value="item.PartNumber"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item :label="$t('form.stations')" prop="preOperationID">
          <el-select
            v-model="form.preOperationID"
            @change="change1"
            :placeholder="$t('form.pleaseSelect') + $t('form.stations')"
          >
            <el-option
              v-for="item in lineType"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>

          <!-- </el-input> -->
        </el-form-item>
        <el-form-item :label="$t('form.endions')" prop="postOperationID">
          <el-select
            v-model="form.postOperationID"
            @change="change2"
            :placeholder="$t('form.pleaseSelect') + $t('form.endions')"
          >
            <el-option
              v-for="item in endions"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>

          <!-- </el-input> -->
        </el-form-item>

        <el-form-item :label="$t('tableText.delayTime')" prop="cycleTime">
          <el-input
            v-model="form.cycleTime"
            :placeholder="$t('tableText.delayTime')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.regulation')" prop="compareRules">
          <el-select
            v-model="form.compareRules"
            :placeholder="$t('tableText.regulation')"
          >
            <el-option
              v-for="item in rulesType"
              :key="item.lable"
              :label="$t(item.lable)"
              :value="item.value"
            ></el-option>
          </el-select>

          <!-- </el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="addCancel()">{{ $t("form.cancel") }}</el-button> -->
        <el-button type="primary" @click="onSubmit('I')">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('form.revise')"
      @close="addCancel()"
      :visible.sync="dialogEdit"
      width="600px"
    >
      <el-form ref="form" :model="editForm" :rules="rules" label-width="120px">
        <el-form-item :label="$t('tableText.product')" prop="productName">
          <div class="box">
            <el-select
              v-model="editForm.productID"
              filterable
              disabled
              :placeholder="$t('form.pleaseSelect') + $t('tableText.product')"
            >
              <el-option
                v-for="item in partList"
                :key="item.PartNumber"
                :label="item.PartNumber"
                :value="item.PartNumber"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item :label="$t('form.stations')" prop="preOperationID">
          <el-select
            v-model="editForm.preOperationID"
            @change="change1"
            disabled
            :placeholder="$t('form.pleaseSelect') + $t('form.stations')"
          >
            <el-option
              v-for="item in lineType"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>

          <!-- </el-input> -->
        </el-form-item>
        <el-form-item :label="$t('form.endions')" prop="postOperationID">
          <el-select
            disabled
            v-model="editForm.postOperationID"
            @change="change2"
            :placeholder="$t('form.pleaseSelect') + $t('form.endions')"
          >
            <el-option
              v-for="item in lineType"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>

          <!-- </el-input> -->
        </el-form-item>

        <el-form-item :label="$t('tableText.delayTime')" prop="cycleTime">
          <el-input
            v-model="editForm.cycleTime"
            :placeholder="$t('tableText.delayTime')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.regulation')" prop="compareRules">
          <el-select
            v-model="editForm.compareRules"
            :placeholder="$t('tableText.regulation')"
          >
            <el-option
              v-for="item in rulesType"
              :key="item.lable"
              :label="$t(item.lable)"
              :value="item.value"
            ></el-option>
          </el-select>

          <!-- </el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="addCancel()">{{ $t("form.cancel") }}</el-button> -->
        <el-button type="primary" @click="onEditSubmit()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { BasicData, ProductRouting } from "@/api/all";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      getDataText: {
        cycleTime: "",
        preOperationID: "",
        preOperationName: "",
        postOperationID: "",
        postOperationName: "",
        compareRules: "",
        userName: getToken(),
        productName: "",
        operationType: "Q",
      },

      lineType: [],
      rulesType: [
        {
          value: "B",
          lable: "tableText.greaterThan",
        },
        {
          value: "S",
          lable: "tableText.lessThan",
        },
      ],
      tableHeight: 0,
      dialogVisible: false,
      dialogEdit: false,
      partList: [],
      form: {
        cycleTime: "",
        preOperationID: "",
        preOperationName: "",
        postOperationID: "",
        postOperationName: "",
        compareRules: "",
        userName: getToken(),
        productName: "",
        productID: "",
        operationType: "",
      },
      editForm: {},
      tableData: [],
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
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
  computed: {
    rules() {
      return {
        productID: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        preOperationID: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        postOperationID: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        cycleTime: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        compareRules: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
      };
    },
    endions() {
      return this.lineType.filter((item) => {
        return item.Number != this.form.preOperationID;
      });
    },
  },

  beforeMount() {
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
    this.getData();
    // this.getBisData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  methods: {
    openAdd() {
      this.getBisData();
      this.dialogVisible = true;
    },
    getBisData() {
      BasicData({
        operationType: "QP",
      }).then((res) => {
        // console.log(res);
        this.partList = res.DataList;
        BasicData({
          operationType: "QO",
        }).then((res) => {
          // console.log(res);
          this.lineType = res.DataList;
        });
      });
    },
    getData() {
      ProductRouting(this.getDataText).then((res) => {
        this.tableData = res.list;
      });
    },
    change(id) {
      let productName = this.partList.find((item) => id == item.PartNumber);
      // console.log();
      this.form.productName = productName.Name;
      // console.log(this.form);
    },
    change1(value) {
      this.form.preOperationName = value;
    },
    change2(value) {
      this.form.postOperationName = value;
    },
    addCancel() {
      this.dialogVisible = false;
      this.dialogEdit = false;
      this.$refs.form.resetFields();
    },
    onSubmit(type) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.operationType = type;
          ProductRouting(this.form).then((res) => {
            if ((res.ResultCode = 200)) {
          
              this.getData();
                this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
              this.dialogVisible = false;
              this.dialogEdit = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onEditSubmit() {
      ProductRouting(this.editForm).then((res) => {
        if ((res.ResultCode = 200)) {
           this.getData();
          this.dialogVisible = false;
          this.dialogEdit = false;
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
         
        }
      });
    },
    handleEdit(row) {
      // console.log(row);

      this.editForm = {
        compareRules: row.CompareRules,
        cycleTime: row.CycleTime,
        postOperationID:  row.PostOperationID,
        postOperationName:row.PostOperationName,
        preOperationID: row.PreOperationID,
        preOperationName: row.PreOperationName,
        productID:row. ProductID,
        productName:row.ProductName,
        updateTime:row.UpdateTime,
        userName: row.UserName,
        operationType: "U",
      };
      this.dialogEdit = true;
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
          let data = { ...row, operationType: "D" };
          ProductRouting(data).then((res) => {
            // console.log(res);
            this.getData();
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
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
  },
};
</script>

<style lang="scss" scoped>
.smtinstpro {
  padding: 10px;
  .box {
    display: flex;
    justify-content: space-between;
  }
  .item {
    margin-bottom: 10px;
  }
}
</style>
