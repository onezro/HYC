<template>
  <div class="plate">
    <div class="box">
      <div>
        <el-button type="primary" size="medium" @click="dialogVisible = true">{{
          $t("form.addButton")
        }}</el-button>
      </div>

      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item">
          <el-input
            size="medium"
            placeholder="请输入项目"
            clearable
            v-model="getDataText.productList"
            class="input-with-select"
          >
          </el-input>
        </el-form-item>

        <el-form-item class="item">
          <el-button type="primary" size="medium" @click="getData()">{{
            $t("form.inquire")
          }}</el-button>
        </el-form-item>
      </el-form>
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
      <el-table-column
        type="index"
        :label="$t('form.serialNumber')"
        width="50"
      ></el-table-column>
      <af-table-column align="center" prop="items" label="项目">
      </af-table-column>
      <af-table-column align="center" prop="dataValue" label="值">
      </af-table-column>

      <af-table-column align="center" prop="stations" label="维护人">
      </af-table-column>
      <af-table-column align="center" prop="stations" label="维护时间">
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
            >{{ $t("form.revise") }}</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete(scope.row)"
            >{{ $t("form.delete") }}</el-button
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
    <el-dialog title="添加" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="项目" prop="items">
          <el-input v-model="form.items"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="dataValue">
          <el-input v-model="form.dataValue" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="addCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改" :visible.sync="dialogEdVisible" width="30%">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="项目" prop="items">
          <el-input v-model="form.items"></el-input>
        </el-form-item>
        <el-form-item label="值" prop="dataValue">
          <el-input v-model="form.dataValue" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="addCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
      },
      tableHeight: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableData: [],
      dialogVisible: false,
      getDataText: {
        workOrder: "",
        productList: "",
        startDateTime: "",
        endDateTime: "",
        lineNumber: "",
      },
      form: {
        items: "",
        dataValue: "",
      },
      dialogEdVisible: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 250;
    });
  },
  methods: {
    addCancel() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
    onSubmit() {},
    handleEdit(row) {
      this.form.items = row.items;
      this.form.dataValue = row.dataValue;
      this.dialogEdVisible = true;
    },
    handleDelete() {},
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
  padding: 10px 10px 0 10px;
  .box {
    display: flex;
    justify-content: space-between;

    .item {
      margin-bottom: 5px;
    }
  }
}
</style>
