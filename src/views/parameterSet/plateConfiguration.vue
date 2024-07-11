<template>
  <div class="plate">
    <div class="box">
      <div>
        <el-button type="primary" @click="dialogVisible = true">{{
          $t("form.addButton")
        }}</el-button>
      </div>

      <!-- <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item"> -->
      <el-input
        :placeholder="$t('form.pleaseEnter') + $t('form.productList')"
        clearable
        v-model="getDataText.productID"
        class="input-with-select"
        @change="getData"
        @keyup.enter.native="getData"
      >
        <el-button
          @click="getData"
          size="small"
          slot="append"
          icon="el-icon-search"
        ></el-button>
      </el-input>
      <!-- </el-form-item> -->
      <!-- <el-form-item class="item">
          <el-input
            placeholder="请输入单号"
            clearable
            v-model="getDataText.workOrder"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-input
            placeholder="请输入样板序号"
            clearable
            v-model="getDataText.productList"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="item">
          <el-select
            v-model="addForm.startOperation"
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
        </el-form-item> -->
      <!-- <el-form-item class="item">
          <el-button type="primary" @click="getData()">{{
            $t("form.inquire")
          }}</el-button>
        </el-form-item> -->
      <!-- </el-form> -->
    </div>
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
        prop="productID"
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
        prop="SampleNumber"
        :label="$t('tableText.tempSnum')"
      >
      </af-table-column>
      <el-table-column
        align="center"
        prop="SampleType"
        :label="$t('tableText.category')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="SamplePosition"
        :label="$t('tableText.stations')"
      >
      </el-table-column>
      <af-table-column
        align="center"
        prop="SampleFaceType"
        :label="$t('tableText.farewell')"
      >
      </af-table-column>
      <af-table-column
        align="center"
        prop="SampleEffective"
        :label="$t('tableText.expirationDate')"
      >
      </af-table-column>
      <af-table-column
        align="center"
        prop="UpdateId"
        :label="$t('tableText.user')"
      >
      </af-table-column>
      <af-table-column
        align="center"
        prop="updateTime"
        :label="$t('tableText.updateTime')"
      >
      </af-table-column>
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
    <el-dialog
      :title="$t('form.add')"
      :visible.sync="dialogVisible"
      width="30%"
      @close="addCancel()"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="80px"
        size="normal"
      >
        <el-form-item :label="$t('form.productList')" prop="productID">
          <el-select
            v-model="addForm.productID"
            filterable
            @change="change"
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in itemList"
              :key="item.PartNumber"
              :label="item.PartNumber"
              :value="item.PartNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.tempSnum')" prop="sampleNumber">
          <el-input
            :placeholder="$t('form.pleaseEnter')"
            clearable
            v-model="addForm.sampleNumber"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.stations')" prop="samplePosition">
          <el-select
            v-model="addForm.samplePosition"
            filterable
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in startList"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.category')" prop="sampleType">
          <el-select
            v-model="addForm.sampleType"
            filterable
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.farewell')" prop="sampleFaceType">
          <el-select
            v-model="addForm.sampleFaceType"
            filterable
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in surface"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('tableText.expirationDate')"
          prop="SampleEffective"
        >
          <el-date-picker
            v-model="addForm.SampleEffective"
            value-format="yyyy-MM-ddTHH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :placeholder="$t('tableText.selectTime')"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="addCancel()">{{ $t("form.cancel") }}</el-button> -->
        <el-button type="primary" @click="addDetermine()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('form.revise')" :visible.sync="dialogEdVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="auto"
        size="normal"
      >
        <el-form-item :label="$t('form.productList')" prop="productName">
          <el-select
            v-model="editForm.productID"
            filterable
            :placeholder="$t('form.pleaseSelect')"
            disabled
          >
            <el-option
              v-for="item in itemList"
              :key="item.PartNumber"
              :label="item.PartNumber"
              :value="item.PartNumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.tempSnum')" prop="productName">
          <el-input
            :placeholder="$t('form.pleaseEnter')"
            clearable
            v-model="editForm.SampleNumber"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.stations')" prop="startOperation">
          <el-select
            v-model="editForm.SamplePosition"
            filterable
            disabled
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in startList"
              :key="item.Number"
              :label="item.Name"
              :value="item.Number"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.category')" prop="category">
          <el-select
            v-model="editForm.SampleType"
            filterable
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.farewell')" prop="surface">
          <el-select
            v-model="editForm.SampleFaceType"
            filterable
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in surface"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('tableText.expirationDate')" prop="startTime">
          <el-date-picker
            v-model="editForm.SampleEffective"
            value-format="yyyy-MM-ddTHH:mm:ss"
            format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            :placeholder="$t('tableText.selectTime')"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">{{ $t("form.cancel") }}</el-button>
        <el-button type="primary" @click="editDetermine()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  DeletGoldSample,
  UpdateGoldSample,
  GoldSampleAdd,
  GetGoldSampleAddList,
  BasicData,
} from "@/api/all";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      dialogVisible: false,
      dialogEdVisible: false,
      tableHeight: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableData: [],
      getDataText: {
        id: "",
        productID: "",
        sampleNumber: "",
        sampleType: "",
        samplePosition: "",
        sampleFaceType: "",
        sampleEffective: "",
        updateId: "",
        productName: "",
        updateTime: "2024-05-30T11:23:18.332Z",
        operationType: "",
      },
      addForm: {
        id: "",
        productID: "",
        sampleNumber: "",
        sampleType: "",
        samplePosition: "",
        sampleFaceType: "",
        sampleEffective: "",
        productName: "",
        updateId: getToken(),
        updateTime: "2024-05-30T11:23:09.305Z",
        operationType: "",
      },
      editForm: {
        OperationType: "",
      },
      itemList: [],
      startList: [],
      category: [
        {
          value: "PASS",
        },
        {
          value: "FAIL",
        },
      ],
      surface: [
        {
          value: "T",
        },
        {
          value: "B",
        },
      ],
    };
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
        sampleNumber: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        samplePosition: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        sampleType: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        sampleFaceType: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        SampleEffective: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 225;
    });
    this.getData();
    this.getBicData();
  },
  methods: {
    getBicData() {
      BasicData({
        operationType: "QP",
      }).then((res) => {
        this.itemList = res.DataList;
        BasicData({
          operationType: "QO",
        }).then((res) => {
          this.startList = res.DataList;
        });
      });
    },
    getData() {
      GetGoldSampleAddList(this.getDataText).then((res) => {
        this.tableData = res.list || [];
      });
    },
    change(id) {
      let productName = this.itemList.find((item) => id == item.PartNumber);
      // console.log();
      this.addForm.productName = productName.Name;
    },
    addCancel() {
      this.dialogVisible = false;
      this.dialogEdVisible = false;
      this.$refs.addForm.resetFields();
    },
    addDetermine() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          GoldSampleAdd(this.addForm).then((res) => {
            if (res.ResultCode == 200) {
              this.$message({
                type: "success",
                message: this.$t("message.success"),
              });
              this.dialogVisible = false;
              this.getData();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editDetermine() {
      UpdateGoldSample(this.editForm).then((res) => {
        if (res.ResultCode == 200) {
          this.dialogEdVisible = false;
            this.$message({
                type: "success",
                message: this.$t("message.success"),
              });
        }
        this.getData();
      });
    },
    handleEdit(row) {
      this.editForm = { ...this.editForm, ...row };
      // console.log(this.editForm);
      this.dialogEdVisible = true;
    },
    handleDelete(row) {
      this.$confirm("确定删除", "确认操作", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = { OperationType: "", ...row };
          DeletGoldSample(data).then((res) => {
            if (res.ResultCode == 200) {
              this.$message({
                type: "success",
                message: this.$t("message.success"),
              });
              this.getData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
  },
};
</script>

<style lang="scss" scoped>
.plate {
  padding: 20px;
  .box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .input-with-select {
      width: 300px;
    }
    .item {
      margin-bottom: 10px;
    }
  }
}
</style>
