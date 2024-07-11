<template>
  <div class="box">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div class="head">
      <div class="item">
        <el-button type="primary" size="medium" @click="dialogAdVisible = true">{{
          $t("form.add")
        }}</el-button>
      </div>
      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item">
          <el-input
            :placeholder="$t('form.pleaseEnter') + $t('form.productList')"
            clearable
            size="medium"
            v-model="getDataText.text"
            class="input-with-select"
            @change="getData"
          >
            <el-button
              size="small"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :height="tableHeight"
        border
        stripe
         size="medium"
        :header-cell-style="heardStyle"
      >
        <af-table-column prop="LineName" :label="$t('tableText.attribute')"> </af-table-column>
        <el-table-column prop="StopActive" :label="$t('tableText.isEnabled')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.StopActive"
              active-value="Y"
              inactive-value="N"
              @change="changeStatus(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="UpdateTime" :label="$t('tableText.updateTime')">
        </el-table-column> -->
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
      <el-form :model="addForm" ref="addForm" label-width="auto" size="normal">
        <el-form-item :label="$t('tableText.attribute')">
          <el-input v-model="addForm.attribute"></el-input>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDetermine()">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    </el-card>
    
   
  </div>
</template>

<script>
export default {
  data() {
    return {
      heardStyle: {
        background: "rgb(102, 146, 217)",
        color: "#ffffff",
        textAlign: "center",
      },
      tableData: [], //表数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
      tableHeight: 0, //表的高度
      dialogAdVisible: false,
      dialogEdVisible: false,
      getDataText: {
        text: "",
      },
      addForm: {
       attribute:''
      },
      editForm: {
         attribute:''
      },
      attribute: [],
      inputVisible: false,
    };
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
    getData() {},
    addCancel() {
      this.dialogAdVisible = false;
      this.$refs.addForm.resetFields();
    },
    changeStatus() {
      console.log(row);
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
        this.tableHeight = window.innerHeight - 225;
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
      margin-bottom: 5px;
    }
  }
}
</style>

