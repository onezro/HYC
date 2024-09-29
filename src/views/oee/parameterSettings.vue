<template>
  <div class="parameterSetting">
    <el-card class="box-card" shadow="always" :body-style="{ padding: '10px' }">
      <div class="header-css">
        <el-button type="primary" @click="dialogFormVisible = true"
          >{{
          $t("form.add")
        }}</el-button
        >
        <div>
          <el-input
            :placeholder="'OEE'+$t('tableText.parameter')"
            v-model="searchiInput"
            class="input-with-select"
            style="width: 300px; margin-right: 20px"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchData()"
            ></el-button>
          </el-input>
          <el-button @click="dataInitialization">查看全部</el-button>
        </div>
      </div>

      <el-table
        :height="tableHeight"
        border
        stripe
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
      >
        <el-table-column prop="LevelType" :label="'OEE'+$t('tableText.type')">
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="isShow[$index]"
              v-model="row.LevelType"
              :placeholder="$t('form.pleaseEnter')"
            ></el-input>
            <span v-if="!isShow[$index]">{{ row.LevelType }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="LevelCode" :label="'OEE'+$t('tableText.parameter')"> </el-table-column>
        <el-table-column prop="Description" :label="'OEE'+$t('tableText.description')">
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="isShow[$index]"
              v-model="row.Description"
              :placeholder="$t('form.pleaseEnter')"
            ></el-input>
            <span v-if="!isShow[$index]">{{ row.Description }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ModifyDate" :label="$t('tableText.time1')">
          <template slot-scope="{ row }">
            <!-- <el-input
              v-if="isShow[$index]"
              v-model="row.ModifyDate"
              placeholder="请输入内容"
            ></el-input> -->
            <span>{{ getDate(row.ModifyDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Operator" :label="$t('form.maintainers')">
          <template slot-scope="{ row, $index }">
            <el-input
              v-if="isShow[$index]"
              v-model="row.Operator"
              :placeholder="$t('form.pleaseEnter')"
            ></el-input>
            <span v-if="!isShow[$index]">{{ row.Operator }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableText.operate')">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="ChangeShow(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        align="center"
        style="margin-top: 15px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </el-card>

    <el-dialog :title="'OEE'+$t('tableText.parameter')" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="auto">
        <el-form-item :label="'OEE'+$t('tableText.type')">
          <el-select v-model="levelTypeInput" :placeholder="'OEE'+$t('tableText.type')">
            <el-option :label="$t('tableText.plan')" value="计划"></el-option>
            <el-option :label="$t('tableText.work')" value="工作"></el-option>
            <el-option :label="$t('tableText.stop')" value="停机"></el-option>
            <el-option :label="$t('tableText.other')" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="'OEE'+$t('tableText.parameter')">
          <el-input v-model="levelCodeInput"></el-input>
        </el-form-item>
        <el-form-item :label="'OEE'+$t('tableText.description')">
          <el-input
            class="popul-item"
            :placeholder="$t('form.pleaseEnter')"
            v-model="descriptionInput"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <!-- <div>
        <el-input
          class="popul-item"
          placeholder="请输入内容"
          v-model="levelCodeInput"
        >
          <template slot="prepend">OEE参数</template>
        </el-input>
        <el-input
          class="popul-item"
          placeholder="请输入内容"
          v-model="levelTypeInput"
        >
          <template slot="prepend">OEE类型</template>
        </el-input>
        <el-input
          class="popul-item"
          placeholder="请输入内容"
          v-model="descriptionInput"
        >
          <template slot="prepend">OEE描述</template>
        </el-input>
      </div> -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('form.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), insertData()"
        >
       {{$t('form.confirm')}}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="更改OE参数信息" :visible.sync="OEChange">
      <div>
        <el-input
          class="popul-item"
        :placeholder="$t('form.pleaseEnter')"
          v-model="levelCodeChange"
          :disabled="true"
        >
          <template slot="prepend">{{'OEE'+$t('tableText.parameter')}}</template>
        </el-input>
        <el-input
          class="popul-item"
         :placeholder="$t('form.pleaseEnter')"
          v-model="levelTypeChange"
        >
          <template slot="prepend">{{'OEE'+$t('tableText.type')}}</template>
        </el-input>
        <el-input
          class="popul-item"
         :placeholder="$t('form.pleaseEnter')"
          v-model="descriptionChange"
        >
          <template slot="prepend">{{'OEE'+$t('tableText.description')}}</template>
        </el-input>
        <!-- <el-input placeholder="请输入内容" v-model="operatorChange">
          <template slot="prepend">操作员</template>
        </el-input> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="OEChange = false">{{$t('form.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="(dialogFormVisible = false), handleUpdate()"
        >
          {{$t('form.confirm')}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { XY_OEE_LevelCodeControl } from "@/api/all";
import { getDate } from "@/utils/getDate";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      searchiInput: "",
      tableData: [],
      dialogFormVisible: false,
      levelCodeInput: "",
      descriptionInput: "",
      levelTypeInput: "",
      modifyDateInput: "",
      operatorInput: "",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      tableHeight: 0,
      isShow: [],
      loading: null,
      levelCodeChange: "",
      descriptionChange: "",
      levelTypeChange: "",
      modifyDateChange: "",
      operatorChange: "",
      OEChange: false,
      index: 0,
      operator: getToken(),
      levelTypeData: [
        { name: "计划", value: "Plan" },
        { name: "工作", value: "Work" },
        { name: "停机", value: "Stop" },
        { name: "其他", value: "Other" },
      ],
    };
  },
  beforeMount() {
    this.dataInitialization();
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  methods: {
    //查询OE参数
    searchData() {
      XY_OEE_LevelCodeControl({
        levelCode: this.searchiInput,
        operationType: "Q",
      })
        .then((res) => {
          if (res.Status === "OK") {
            this.tableData = res.DataList;
          } else if (res.Status === "NG") {
            this.tableData = [];
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: `网络不良`,
          });
        });
    },
    //添加一条数据
    async insertData() {
      let haveCode = false;
      await this.tableData.forEach((item) => {
        if (item.LevelCode === this.levelCodeInput) {
          haveCode = true;
          this.$message({
            type: "error",
            message: `此参数已有,请输入新参数`,
          });
          return;
        }
      });
      if (haveCode) {
        return;
      }

      let date = this.getDateTo();
      XY_OEE_LevelCodeControl({
        LevelCode: this.levelCodeInput,
        levelType: this.levelTypeInput,
        description: this.descriptionInput,
        dateTime: date,
        operator: this.operator,
        operationType: "I",
      })
        .then((res) => {
          if (res.Status === "OK") {
            this.tableData.unshift({
              LevelCode: this.levelCodeInput,
              LevelType: this.levelTypeInput,
              Description: this.descriptionInput,
              ModifyDate: date,
              Operator: this.operator,
            });
            this.levelCodeInput = "";
            this.levelTypeInput = "";
            this.descriptionInput = "";
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: `网络不良`,
          });
        });
    },
    //分页
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getScreenHeight() {
      this.$nextTick(() => {
        this.tableHeight = window.innerHeight - 225;
        //后面的50：根据需求空出的高度，自行调整
      });
    },
    //初始化获取数据
    dataInitialization() {
      // this.startLoading();
      XY_OEE_LevelCodeControl({
        operationType: "QA",
      })
        .then((res) => {
          if (res.Status === "OK") {
            this.tableData = res.DataList;
          } else {
            this.$message({
              type: "error",
              message: `初始化失败!`,
            });
          }
          // this.endLoading();
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: `网络不良`,
          });
          // this.endLoading();
        });
    },
    //新增信息
    handleEdit(index, row) {
      this.$set(this.isShow, index, true);
    },
    handelCancel(index, row) {
      this.$set(this.isShow, index, false);
    },
    //数据修改
    ChangeShow(index, row) {
      this.levelCodeChange = row.LevelCode;
      this.levelTypeChange = row.LevelType;
      this.descriptionChange = row.Description;
      this.operatorChange = row.Operator;
      this.modifyDateChange = row.ModifyDate;
      this.OEChange = true;
      this.index = index;
    },
    ChangeHidden() {
      this.OEChange = false;
    },
    handleUpdate() {
      // this.startLoading();
      XY_OEE_LevelCodeControl({
        levelCode: this.levelCodeChange,
        levelType: this.levelTypeChange,
        description: this.descriptionChange,
        operator: this.operatorChange,
        dateTime: this.getDate(this.modifyDateChange),
        operationType: "U",
      })
        .then((res) => {
          if (res.Status === "OK") {
            this.tableData[this.index] = {
              LevelCode: this.levelCodeChange,
              LevelType: this.levelTypeChange,
              Description: this.descriptionChange,
              Operator: this.operatorChange,
              ModifyDate: this.getDate(this.modifyDateChange),
            };
          }
          this.OEChange = false;
          // this.endLoading();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: `网络不良`,
          });
          this.OEChange = false;
          // this.endLoading();
        });
    },
    //删除数据
    handleDelete(index, row) {
      // this.startLoading();
      XY_OEE_LevelCodeControl({
        ...row,
        operationType: "D",
      })
        .then((res) => {
          if (res.Status === "OK") {
            this.tableData = this.tableData.filter((message, i) => {
              return index !== i;
            });
          }
          // this.endLoading();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: `网络不良`,
          });
          // this.endLoading();
        });
    },
    getDate(timestamp) {
      let getTime = new Date(timestamp);
      let year = getTime.getFullYear();
      let month = getTime.getMonth() + 1;
      let date = getTime.getDate();
      let hours = getTime.getHours();
      let min = getTime.getMinutes();
      let second = getTime.getSeconds();
      hours = hours < 10 ? "0" + hours : hours;
      min = min < 10 ? "0" + min : min;
      second = second < 10 ? "0" + second : second;
      let todayTime = year + "-" + month + "-" + date;
      let todayHours = hours + ":" + min + ":" + second;
      return todayTime + " " + todayHours;
    },
    getDateTo() {
      let getTime = new Date();
      let year = getTime.getFullYear();
      let month = getTime.getMonth() + 1;
      let date = getTime.getDate();
      let hours = getTime.getHours();
      let min = getTime.getMinutes();
      let second = getTime.getSeconds();
      hours = hours < 10 ? "0" + hours : hours;
      min = min < 10 ? "0" + min : min;
      second = second < 10 ? "0" + second : second;
      let todayTime = year + "-" + month + "-" + date;
      let todayHours = hours + ":" + min + ":" + second;
      return todayTime + " " + todayHours;
    },
  },
};
</script>

<style lang="scss" scoped>
.parameterSetting {
  padding: 10px;
  .header-css {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .input {
    width: 200px;
    margin-right: 10px;
  }
}

.popul-item {
  margin-bottom: 20px;
}
</style>
