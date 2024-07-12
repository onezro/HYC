<template>
  <div class="box">
    <div class="head">
      <div class="item">
        <el-button type="primary" @click="openAdd">{{
          $t("form.add")
        }}</el-button>
      </div>
      <div>
        <!-- <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item"> -->
        <el-input
          :placeholder="$t('form.pleaseEnter')"
          clearable
          v-model="getDataText.mcid"
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
      </div>
      <!-- </el-form-item>
      </el-form> -->
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
        <el-table-column prop="MCID" :label="$t('tableText.device') + 'ID'">
        </el-table-column>
        <el-table-column
          prop="MCName"
          :label="$t('tableText.device') + $t('tableText.name')"
        >
        </el-table-column>
        <af-table-column
          align="center"
          prop="Product"
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
          prop="DetectionTime"
          :label="$t('tableText.cleanTime') + '(min)'"
        >
        </af-table-column>
        <el-table-column prop="UpdateId" :label="$t('form.maintainers')">
        </el-table-column>
        <af-table-column prop="UpdateTime" :label="$t('tableText.updateTime')">
        </af-table-column>
        <el-table-column prop="StopActive" :label="$t('tableText.isEnabled')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.Status"
              active-value="1"
              inactive-value="0"
              @change="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <af-table-column
          fixed="right"
          :label="$t('form.operate')"
        
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
        </af-table-column>
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
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="auto"
        size="normal"
      >
        <el-form-item :label="$t('form.productList')" prop="product">
          <el-select
            v-model="addForm.product"
            filterable
            @change="change1"
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
        <el-form-item :label="$t('tableText.device')" prop="mcid">
          <el-select
            v-model="addForm.mcid"
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
        <el-form-item
          :label="$t('tableText.device') + 'ID'"
          size="normal"
          prop="mcid"
        >
          <el-input v-model="addForm.mcid" disabled></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('tableText.cleanTime') + '(min)'"
          size="normal"
          prop="detectionTime"
        >
          <el-input v-model="addForm.detectionTime"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('tableText.isEnabled')"
          size="normal"
          prop="status"
        >
          <el-switch
            v-model="addForm.status"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
        </el-form-item>
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
      @close="addCancel"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        label-width="auto"
        size="normal"
      >
        <el-form-item :label="$t('form.productList')" prop="product">
          <el-select
            v-model="editForm.Product"
            filterable
            disabled
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
        <el-form-item :label="$t('tableText.device')">
          <el-select
            v-model="editForm.MCID"
            filterable
            disabled
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
        <el-form-item :label="$t('tableText.device') + 'ID'" size="normal">
          <el-input v-model="editForm.MCID" disabled></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('tableText.cleanTime') + '(min)'"
          size="normal"
        >
          <el-input v-model="editForm.DetectionTime"></el-input>
        </el-form-item>
        <el-form-item :label="$t('tableText.isEnabled')" size="normal">
          <el-switch
            v-model="editForm.Status"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
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
  SteelMeshListdd,
  GeSteelMeshList,
  UpdateSteelMesh,
  DeletSteelMesh,
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
      tableData: [], //表数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableHeight: 0, //表的高度
      dialogAdVisible: false,
      dialogEdVisible: false,
      getDataText: {
        mcid: "",
        mcName: "",
        product: "",
        updateId: "",
        updateTime: "2024-05-31T03:00:58.390Z",
        status: "",
        detectionTime: "",
        productName: "",
        operationType: "",
      },
      itemList: [],
      machineType: [],
      addForm: {
        mcid: "",
        mcName: "",
        product: "",
        updateId: getToken(),
        updateTime: "2024-05-31T02:55:03.174Z",
        status: "0",
        detectionTime: "",
        operationType: "",
      },
      editForm: {
        updateId: getToken(),
        operationType: "",
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
  computed: {
    rules() {
      return {
        product: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        mcid: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
        detectionTime: [
          {
            required: true,
            message: this.$t("rules.error"),
            trigger: "change",
          },
        ],
      };
    },
  },
  methods: {
    getBicData() {
      BasicData({
        operationType: "QP",
      }).then((res) => {
        this.itemList = res.DataList;
        BasicData({
          operationType: "QA",
        }).then((res) => {
          //   console.log(res);
          this.machineType = res.DataList;
        });
      });
    },
    getData() {
      GeSteelMeshList(this.getDataText).then((res) => {
        this.tableData = res.list || [];
      });
    },
    openAdd() {
      this.getBicData();
      this.dialogAdVisible = true;
    },
    change(data) {
      //   console.log(data);
      this.addForm.mcName = this.deviceName(data);
    },
    change1(id) {
      console.log(id);
      let productName = this.itemList.find((item) => id == item.PartNumber);
      // console.log();

      this.addForm.productName = productName.Name;
    },
    deviceName(id) {
      let decice = this.machineType.find(
        ({ AssetNumber }) => id == AssetNumber
      );
      return decice.Name;
    },
    editCancel() {},
    editDeter() {
      //   console.log(this.editForm);
      UpdateSteelMesh(this.editForm).then((res) => {
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
          this.dialogEdVisible = false;
        }
      });
    },
    addCancel() {
      this.dialogAdVisible = false;
      this.dialogEdVisible = false;
      this.$refs.addForm.resetFields();
    },
    //添加
    addDetermine() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          SteelMeshListdd(this.addForm).then((res) => {
            if (res.ResultCode == 200) {
              this.$message({
                type: "success",
                message: this.$t("message.success"),
              });
              this.getData();
              this.dialogAdVisible = false;
              this.$refs.addForm.resetFields();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeStatus(row) {
      this.editForm = { ...this.editForm, ...row };
      UpdateSteelMesh(this.editForm).then((res) => {
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
          this.dialogEdVisible = false;
        }
      });
    },
    handleEdit(row) {
      this.editForm = { ...this.editForm, ...row };
      // console.log(this.addForm);
      this.dialogEdVisible = true;
    },
    handleDelete(row) {
      let data = { OperationType: "", ...row };
      DeletSteelMesh(data).then((res) => {
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
        }
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
        this.tableHeight = window.innerHeight - 205;
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
