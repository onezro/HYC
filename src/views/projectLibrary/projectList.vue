<template>
  <div class="box">
    <div class="head">
      <div class="item">
        <el-button type="primary" @click="dialogAdVisible = true">{{
          $t("form.add")
        }}</el-button>
      </div>
      <el-form ref="form" class="form" :inline="true" :model="getDataText">
        <el-form-item class="item">
          <el-input
            :placeholder="$t('form.pleaseEnter') + $t('form.productList')"
            clearable
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
        :header-cell-style="heardStyle"
      >
        <af-table-column prop="LineName" :label="$t('tableText.itemNumber')">
        </af-table-column>
        <af-table-column prop="LineName" :label="$t('tableText.productModel')">
        </af-table-column>
        <af-table-column prop="LineName" :label="$t('tableText.farewell')">
        </af-table-column>
        <af-table-column prop="LineName" :label="$t('tableText.points')">
        </af-table-column>
        <af-table-column prop="LineName" :label="$t('tableText.attribute')">
        </af-table-column>
        <af-table-column
          prop="LineName"
          :label="$t('tableText.subgroupCapacity')"
        >
        </af-table-column>
        <af-table-column prop="LineName" :label="$t('tableText.unit')">
        </af-table-column>
        <af-table-column prop="LineName" :label="$t('tableText.standardValue')">
        </af-table-column>
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
      width="50%"
      @close="addCancel"
    >
      <el-form :model="addForm" ref="addForm" label-width="auto" size="normal">
        <el-row :gutter="30">
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.itemNumber')">
              <el-input v-model="addForm.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.unit')">
              <el-input style="width: 180px" v-model="addForm.productName">
                <i slot="suffix" style="font-style: normal; margin-right: 10px"
                  >%</i
                ></el-input
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.productModel')">
              <el-input v-model="addForm.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.standardValue')">
              <el-input v-model="addForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.farewell')">
              <el-select
                v-model="mcId"
                @change="change"
                filterable
                :placeholder="
                  $t('form.pleaseSelect') + $t('tableText.farewell')
                "
              >
                <el-option
                  v-for="item in farewell"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- <el-input v-model="addForm.productName"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="USL">
              <el-input v-model="addForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.points')">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ {{ $t("tableText.points") }}</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="LSL">
              <el-input v-model="addForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12" :offset="0">
            <el-form-item :label="$t('tableText.attribute')">
              <el-select
                v-model="mcId"
                @change="change"
                filterable
                :placeholder="$t('form.pleaseSelect')"
              >
                <el-option
                  v-for="item in attribute"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--   -->
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDetermine()">{{
          $t("form.confirm")
        }}</el-button>
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
        productName: "",
        templateNumber: "",
        startOperation: "",
        category: "",
        surface: "",
      },
      editForm: {},
      farewell: [
        {
          value: "T",
          label: "T",
        },
        {
          value: "B",
          label: "B",
        },
      ],
      attribute: [],
      inputVisible: false,
      dynamicTags: ["点位1", "点位2", "点位3"],
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showInput() {
      this.inputVisible = true;
    },
    addCancel() {
      this.dialogAdVisible = false;
      this.$refs.addForm.resetFields();
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
        this.tableHeight = window.innerHeight - 255;
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
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
