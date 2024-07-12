<template>
  <div class="parametEnable">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div class="box">
        <el-form
          :model="form"
          ref="form"
          :rules="rules"
          size="normal"
          :inline="true"
        >
          <el-form-item :label="$t('tableText.product')" prop="productName">
            <el-select
              v-model="form.productID"
              filterable
              @change="change"
              :placeholder="$t('form.pleaseSelect') + $t('tableText.product')"
            >
              <el-option
                v-for="item in itemList"
                :key="item.PartNumber"
                :label="item.PartNumber"
                :value="item.PartNumber"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('tableText.time')" prop="cycleTime">
            <el-input
              v-model.number="form.cycleTime"
              :placeholder="$t('form.pleaseEnter') + $t('tableText.time')"
            ></el-input>
          </el-form-item>
          <el-form-item class="item">
            <el-button type="primary" @click="addDetermine">{{
              $t("form.add")
            }}</el-button>
            <!-- <el-button type="primary" @click="onSubmit">解锁</el-button> -->
          </el-form-item>
        </el-form>
        <div>
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="getDataText.productID"
            class="input-with-select"
            @change="getSearchData"
            @keyup.enter.native="getSearchData"
          >
            <el-button
              @click="getSearchData"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </div>
      </div>

      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        size='medium'
        :height="tableHeight"
        border
        stripe
      >
        <af-table-column
          
          prop="ProductId"
          :label="$t('form.productNum')"
        >
        </af-table-column>
        <af-table-column
          
          prop="ProductName"
          :label="$t('form.productList') + $t('tableText.name')"
        >
        </af-table-column>
        <!-- <el-table-column prop="startOperation" label="开始工序">
        </el-table-column>
        <el-table-column prop="endOperation" label="结束工序">
        </el-table-column> -->
        <af-table-column
          prop="CycleTime"
          :label="$t('tableText.time')"
        >
        </af-table-column>
        <af-table-column prop="UserName" :label="$t('tableText.user')">
          </af-table-column
        >
        <af-table-column prop="UpdateTime" :label="$t('tableText.updateTime')">
        </af-table-column>

        <el-table-column
          fixed="right"
          :label="$t('tableText.operate')"
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
    </el-card>
    <!-- 添加弹框 -->
    <el-dialog :title="$t('form.add')" :visible.sync="dialogVisible">
      <el-form :model="form" ref="form" size="normal">
        <el-form-item
          :label="$t('form.productList')"
          label-width="80px"
          prop="productName"
        >
          <el-select
            v-model="form.productName"
            filterable
            :placeholder="$t('form.pleaseSelect') + $t('tableText.product')"
          >
            <el-option
              v-for="item in itemList"
              :key="item.PartNumber"
              :label="item.PartNumber"
              :value="item.PartNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始工序" label-width="80px" prop="startOperation">
          <el-select
            v-model="form.startOperation"
            filterable
            placeholder="点击选择"
          >
            <el-option
              v-for="item in startList"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="结束工序" label-width="80px" prop="endOperation">
          <el-select
            v-model="form.endOperation"
            filterable
            placeholder="点击选择"
          >
            <el-option
              v-for="item in startList"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" label-width="80px" prop="cycleTime">
          <el-input v-model="form.cycleTime" placeholder="输入时间"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">取 消</el-button>
        <el-button type="primary" @click="addDetermine()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog
      :title="$t('form.revise')"
      :visible.sync="dialogEidt"
      width="30%"
    >
      <el-form :model="form" ref="form" size="normal" label-width="80px">
        <el-form-item :label="$t('tableText.product')" prop="productName">
          <el-select
            v-model="editForm.ProductName"
            disabled
            filterable
            :placeholder="$t('form.pleaseSelect') + $t('tableText.product')"
          >
            <el-option
              v-for="item in itemList"
              :key="item.PartNumber"
              :label="item.PartNumber"
              :value="item.PartNumber"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('tableText.time')" prop="cycleTime">
          <el-input
            v-model="editForm.CycleTime"
            :placeholder="$t('form.pleaseEnter') + $t('tableText.time')"
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
import { BasicData, ProductCycle } from "@/api/all";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false, //添加
      dialogEidt: false,
      currentPage: 1, // 当前页码
      //   total: 0, // 总条数
      pageSize: 10, // 每
      tableHeight: 0,
      form: {
        productName: "",
        cycleTime: "",
        productID: "",
        userName: getToken(),
        operationType: "I",
      },
      getDataText: {
        cycleTime: 0,
        userName: getToken(),
        productName: "",
        productID: "",
        operationType: "Q",
      },
      editForm: {
        id: "",
        startOperation: "",
        endOperation: "",
        time: "",
      },
      itemList: [],
      startList: [],
      endList: [],
    };
  },
  computed: {
    rules() {
      return {
        cycleTime: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
      };
    },
  },
  beforeMount() {
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
    this.getSearchData();
    this.getData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  methods: {
    getData() {
      BasicData({ operationType: "QP" }).then((res) => {
        this.itemList = res.DataList;
      });
    },
    getSearchData() {
      ProductCycle(this.getDataText).then((res) => {
        // console.log(res);
        this.tableData = res.list;
      });
    },
    change(id) {
      let productName = this.itemList.find((item) => id == item.PartNumber);
      // console.log();
      this.form.productName = productName.Name;
      // console.log(this.form);
    },
    //关闭添加弹窗
    addCancel() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
    //添加确定
    addDetermine() {
      // console.log(this.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          ProductCycle(this.form).then((res) => {
            if (res.ResultCode == 200) {
              this.dialogVisible = false;

              this.getSearchData(this.form.productName);
              this.$refs.form.resetFields();
              this.$message({
                type: "success",
                message: this.$t("message.success"),
              });
            }
            this.getSearchData();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editCancel() {
      this.dialogEidt = false;
      this.$refs.form.resetFields();
    },
    //添加确定
    editDetermine() {
      this.editForm.operationType = "U";
      // console.log(this.editForm);
      ProductCycle(this.editForm).then((res) => {
        if (res.ResultCode == 200) {
          this.dialogEidt = false;
          this.getSearchData();
          this.$refs.form.resetFields();
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
        }
      });
    },
    //修改
    handleEdit(row) {
      this.dialogEidt = true;
      this.editForm = { ...row };
      // this.form.productName = row.ProductName;
      // this.form.cycleTime = row.CycleTime;
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
          ProductCycle(data).then(() => {
            this.$message({
              type: "success",
              message: this.$t("message.success"),
            });
            // this.tableData = [];
            this.getSearchData(row.ProductName);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.Cancel"),
          });
        });
    },
    handleHis() {},
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
.parametEnable {
  padding: 10px;
  .item {
    margin-bottom: 10px;
  }
  .box {
    display: flex;
    justify-content: space-between;
  }
  .table_header {
    padding-bottom: 10px;
    display: flex;
    // gap: 30px;
    justify-content: space-between;
    align-items: center;
    // .input_box {
    //   width: 400px;
    // }
  }
}
</style>
