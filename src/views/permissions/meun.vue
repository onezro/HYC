<template>
  <div class="meun">
    <el-card class="box-card">
      <div class="table_header">
        <el-button type="primary" @click="dialogVisible = true">{{$t('form.add')}}</el-button>
      </div>
      <div class="table_container">
        <el-table
          :data="
            tableData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          :height="tableHeight"
          row-key="xyClientMenuId"
          border
          style="width: 100%"
          :tree-props="{ children: 'childs' }"
        >
          >
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="title" :label="$t('form.menuName')"> </el-table-column>
          <el-table-column prop="icon" :label="$t('form.iconText')"> </el-table-column>
          <el-table-column prop="component" :label="$t('form.component')"> </el-table-column>
          <el-table-column prop="path" :label="$t('form.path')"> </el-table-column>
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
                @click="handleEdit(scope.$index, scope.row)"
                ></el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)"
                ></el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    </el-card>
    <el-dialog
      :title="$t('form.add')"
      @close="addCancel()"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item :label="$t('tableText.menu')+$t('tableText.type')" prop="tabPosition">
          <el-radio-group v-model="tabPosition">
            <el-radio-button label="tableText.directory">{{$t('tableText.directory')}}</el-radio-button>
            <el-radio-button label="tableText.menu">{{$t('tableText.menu')}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('tableText.parentMenu')" prop="chooseName">
          <el-select
            :disabled="fmeun"
            ref="selectUpResId"
            v-model="chooseName"
            :placeholder="$t('form.pleaseSelect')"
            clearable
          >
            <el-option
              :value="chooseName"
              disabled
              style="overflow: auto; height: 100%"
            >
              <el-tree
                style="min-height: 150px; max-height: 300px"
                :props="defaultProps"
                :data="tableData"
                node-key="xyClientMenuId"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                @node-click="handleNodeClick"
              >
              </el-tree
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('form.path')">
          <el-input v-model="form.path" :placeholder="$t('form.path')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.menuName')">
          <el-input v-model="form.title" :placeholder="$t('form.menuName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.component')">
          <el-input
            :disabled="fmeun"
            v-model="form.component"
            :placeholder="$t('form.component')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.componentName')">
          <el-input
            v-model="form.xyClientMenuName"
            :placeholder="$t('form.componentName')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.iconText')">
          <el-input v-model="form.icon" :placeholder="$t('form.iconText')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCancel()">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="onSubmit()">{{$t('form.confirm')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('form.revise')"
      @close="editCancel()"
      :visible.sync="editVisible"
      width="50%"
    >
      <el-form :model="editform" ref="form" label-width="auto">
        <el-form-item :label="$t('tableText.parentMenu')">
          <el-select
            ref="selectUpResId"
            v-model="editPName"
           :placeholder="$t('form.pleaseSelect')"
            clearable
          >
            <el-option
              :value="editPName"
              disabled
              style="overflow: auto; height: 100%"
            >
              <el-tree
                style="min-height: 150px; max-height: 300px"
                :props="defaultProps"
                :data="tableData"
                node-key="xyClientMenuId"
                :expand-on-click-node="false"
                :check-on-click-node="true"
                @node-click="handleENodeClick"
              >
              </el-tree
            ></el-option>
          </el-select>
          <!-- <el-input v-model="editform.clientMenuFID">

        </el-input> -->
        </el-form-item>
      <el-form-item :label="$t('form.path')">
          <el-input v-model="editform.path" :placeholder="$t('form.path')"></el-input>
        </el-form-item>
         <el-form-item :label="$t('form.menuName')">
          <el-input v-model="editform.title" :placeholder="$t('form.menuName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.component')">
          <el-input
            :disabled="fmeun"
            v-model="editform.component"
            :placeholder="$t('form.component')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.componentName')">
          <el-input
            v-model="editform.xyClientMenuName"
            :placeholder="$t('form.componentName')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('form.iconText')">
          <el-input v-model="editform.icon" :placeholder="$t('form.iconText')"></el-input>
        </el-form-item>
        <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancel()">{{$t('form.cancel')}}</el-button>
        <el-button type="primary" @click="editSubmit()">{{$t('form.confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFirstMeun,
  getChildMeun,
  addMeun,
  deleteMeun,
  updateMeun,
} from "@/api/index";

export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      treeData: [],
      tableHeight: 0,
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数,
      form: {
        clientLevel: "",
        clientMenuFID: "",
        title: "",
        component: "",
        xyClientMenuName: "",
        icon: "",
      },
      tabPosition: "tableText.menu",
      chooseName: "",
      defaultProps: {
        label: "title",
        children: "childs",
        // isLeaf: "hasChildren",
      },
      fmeun: false,
      // choosePath: "",
      arrID: [],
      editVisible: false,
      editform: {},
      editPName: "",
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
  watch: {
    tabPosition(a) {
      if (a == "目录") {
        this.fmeun = true;
        this.form.clientLevel = "1";
        this.form.component = "Layout";
      } else {
        this.fmeun = false;
        this.form.component = "";
      }
    },
  },
  methods: {
    getData() {
      getFirstMeun().then(({ data }) => {
        // console.log(data.content);
        // this.tableData = data.content;
        this.tableData = data.content;
        // this.treeData = data.content.map((item) => {
        //   // console.log(item);
        //   if (item.sonNum > 0) {
        //     return {
        //       ...item,
        //       hasChildren: false,
        //     };
        //   } else {
        //     return {
        //       ...item,
        //       hasChildren: true,
        //     };
        //   }
        // });
      });
    },

    addCancel() {
      this.dialogVisible = false;
    },
    onSubmit() {
      console.log(this.form);
      // addMeun(this.form).then((res) => {
      //   // console.log(res.data);
      //   this.getData();
      //   this.dialogVisible = false;
      // });
    },
    editCancel() {
      this.editVisible = false;
    },
    editSubmit() {
      updateMeun(this.editform).then((res) => {
        // console.log(res);
        this.editVisible = false;
        this.getData();
      });
    },
    handleEdit(index, row) {
      this.editform = row;
      this.editVisible = true;
      if (row.clientMenuFID != null) {
        this.editPName = this.findNameById(row.clientMenuFID, this.tableData);
      }
    },
    findNameById(id, data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].xyClientMenuId === id) {
          // console.log(data[i].title);
          return data[i].title; //名称
        } else if (data[i].childs) {
          const result = this.findNameById(id, data[i].childs);
          if (result) {
            return result;
          }
        }
      }
      return null;
    },
    handleENodeClick(data) {
      this.editPName = data.title;
      this.editform.clientMenuFID = data.xyClientMenuId;
      this.editform.clientLevel = data.clientLevel + 1;
      // console.log(this.editform);
      this.$refs.selectUpResId.blur();
    },
    handleDelete(index, row) {
      // console.log(row);
      this.arrID.unshift(row.xyClientMenuId);
      this.dataDispose(row);
      // console.log(this.arrID);
      this.arrID.forEach((item) => {
        deleteMeun(item).then(({ data }) => {
          console.log(data);
          this.arrID = this.arrID.filter((id) => id != item);
          // console.log(this.arrID);
          if (this.arrID.length == 0) {
            this.getData();
          }
        });
      });
    },
    dataDispose(row) {
      if (row.sonNum != 0) {
        row.childs.forEach((item) => {
          this.arrID.unshift(item.xyClientMenuId);
          if (item.sonNum != 0) {
            return this.dataDispose(item);
          }
        });
      } else {
        return;
      }
    },
    handleNodeClick(data) {
      this.chooseName = data.title;
      this.form.clientMenuFID = data.xyClientMenuId;
      this.form.clientLevel = data.clientLevel + 1;
      // this.choosePath = data.path;
      this.$refs.selectUpResId.blur();
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
        this.tableHeight = window.innerHeight - 310;
        // this.tableHeight1 =
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.meun {
  padding: 10px;
  .table_header {
    padding-bottom: 20px;
    display: flex;
    // gap: 30px;
    // justify-content: flex-end;
    align-items: center;
    .input_box {
      width: 400px;
    }
  }
}
</style>
