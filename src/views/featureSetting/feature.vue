<template>
  <div class="feature" ref="feature">
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div style="margin-bottom: 10px">
        <el-button type="primary" @click="dialogAdVisible = true">{{
          $t("form.add")
        }}</el-button>
      </div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :height="tableHeight"
        border
        stripe
        ref="tree"
        row-key="ID"
        :tree-props="{ children: 'list' }"
      >
        >
        <el-table-column prop="DeviceName" :label="$t('tableText.lineName')">
          <template slot-scope="scope">
            {{ scope.row.level == 1 ? scope.row.DeviceName : "" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="DeviceCode"
          :label="$t('tableText.device') + 'ID'"
        >
          <template slot-scope="scope">
            {{ scope.row.level == 2 ? scope.row.DeviceCode : "" }}
          </template>
        </el-table-column>
        <el-table-column prop="McName" :label="$t('tableText.device')">
          <template slot-scope="scope">
            {{ scope.row.level == 2 ? scope.row.DeviceName : "" }}
          </template>
        </el-table-column>
        <!-- <af-table-column
          prop="McParameterKey"
          :label="$t('tableText.parameter')"
        >
          <template slot-scope="scope">
              <div class="choosesw" v-if="scope.row.level == 2">
               
                <el-switch v-model="value2" active-text="工单产品"> </el-switch>
                <el-switch v-model="value3" active-text="生命周期"> </el-switch>
                <el-switch v-model="value4" active-text="前工序时间">
                </el-switch>
              </div>
            </template>
        </af-table-column> -->
        <!-- <el-table-column prop="user" label="操作员"> </el-table-column> -->
        <el-table-column prop="UpdateTime" :label="$t('tableText.updateTime')">
        </el-table-column>
        <el-table-column :label="$t('tableText.isEnabled')">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.DeviceEnable"
              v-model="scope.row.DeviceEnable"
              active-value="Y"
              inactive-value="N"
              @change="changeStatus(scope.row)"
            >
            </el-switch>
            <!-- <el-switch
              v-if="scope.row.McParameterStatus"
              v-model="scope.row.McParameterStatus"
              active-value="Y"
              inactive-value="N"
              @change="changeStatus(scope.row.McParameterStatus, scope.row)"
            >
            </el-switch> -->
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('form.operate')"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.level == 2"
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
            <!-- <el-button
              type="warning"
              size="mini"
              icon="el-icon-time"
              @click="handleHis(scope.$index, scope.row)"
            ></el-button> -->
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
    <el-dialog
      :title="$t('form.add')"
      :visible.sync="dialogAdVisible"
      width="30%"
      @close="addCancel"
    >
      <el-form
        :model="form"
        ref="form"
        label-width="auto"
        :inline="false"
        size="normal"
      >
        <el-form-item label="线体" prop="item">
          <el-select
            v-model="item"
            filterable
            value-key="ID"
            @change="changeLine"
            :placeholder="$t('form.pleaseSelect')"
          >
            <el-option
              v-for="item in lineList"
              :key="item.ID"
              :label="`${item.Name}`"
              :value="item"
              >{{ item.Name }}</el-option
            >
          </el-select>
        </el-form-item>

        <el-form-item
          :label="$t('tableText.device')"
          prop="menus"
          size="normal"
        >
          <el-tree
            :data="treeData"
            show-checkbox
            node-key="ID"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button type="primary" @click="addDetermine">{{
          $t("form.confirm")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('form.add')"
      :visible.sync="dialogEdVisible"
      width="50%"
      :center="true"
      @close="editCancel()"
    >
      <el-form
        :model="form1"
        ref="form1"
        label-width="auto"
        :inline="true"
        size="normal"
      >
        <el-form-item label="设备">
          <el-input v-model="form1.deviceName" disabled></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="mcParameterKey">
          <el-select
            v-model="form1.mcParameterKey"
            filterable
            :placeholder="$t('form.pleaseSelect') + $t('tableText.parameter')"
          >
            <el-option
              v-for="item in newParame"
              :key="item.ParameterCode"
              :label="item.ParameterName"
              :value="item.ParameterCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{
            $t("form.add")
          }}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableParame" border stripe>
        <!-- <el-table-column prop="McId" :label="$t('tableText.device')">
          <template slot-scope="scope">
            {{ deviceName(scope.row.McId) }}
          </template>
        </el-table-column> -->
        <af-table-column prop="McSettingDes" :label="$t('tableText.parameter')">
          <!-- <template slot-scope="scope">
            {{ deviceName(scope.row.McParameterKey) }}
          </template> -->
          <!-- <template slot-scope="scope">
              <div class="choosesw">
                <el-switch
                  v-model="scope.row.isWorder"
                  @change="handleStatusChange(scope.row)"
                  active-text="是否当前工单"
                >
                </el-switch>
                <el-switch v-model="value2" active-text="工单产品"> </el-switch>
                <el-switch v-model="value3" active-text="生命周期"> </el-switch>
                <el-switch v-model="value4" active-text="前工序时间">
                </el-switch>
              </div>
            </template> -->
        </af-table-column>
        <af-table-column prop="UpdateTime" :label="$t('tableText.updateTime')">
        </af-table-column>
        <el-table-column
          prop="McParameterStatus"
          :label="$t('tableText.isEnabled')"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.McParameterStatus"
              active-value="Y"
              inactive-value="N"
              @change="changeStatus22(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- <af-table-column prop="user" label="操作人"> </af-table-column> -->

        <el-table-column
          fixed="right"
          :label="$t('tableText.operate')"
          width="150"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete1(scope.row)"
            ></el-button>
            <!-- <el-button
              type="warning"
              icon="el-icon-time"
              size="mini"
              @click="handleHis(scope.row)"
            ></el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetProductionLineList,
  GetEquipmentList,
  MCDeviceAdd,
  UpdateMCDevice,
  GetMCDeviceList,
  DeletMCDevice,
  GetParameterSettingsList,
  MCMcSettingAdd,
  DeletSeettingDevice,
  GetMcSettingList,
  UpdateMcSetting,
} from "@/api/all";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      form1: {
        deviceName: "",
        id: "",
        deviceID: "",
        mcId: 0,
        mcParameterKey: "",
        mcSettingDes: "",
        mcParameterStatus: "N",
        updateTime: "2024-05-29T03:31:02.535Z",
        userName: getToken(),
        operationType: "I",
      },
      form: {
        id: "",
        deviceName: "",
        deviceCode: "",
        deviceEnable: "0",
        parentLevel: "0",
        childLevel: "0",
        productionLine: "",
        createuid: getToken(),
        createtime: "2024-05-28T09:46:40.039Z",
        updateuid: "",
        updatetime: "2024-05-28T09:46:40.039Z",
        ext: "",
        status: "1",
        OperationType: "",
        list: [],
      },
      item: "",
      lineList: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      tableHeight: 0,
      dialogAdVisible: false,
      dialogEdVisible: false,
      defaultProps: {
        label: "Name",
        children: "childs",
      },
      treeData: [],
      parameterList: [],
      tableParame: [],
    };
  },
  beforeMount() {
    this.getScreenHeight();
  },
  mounted() {
    window.addEventListener("resize", this.getScreenHeight);
    this.getData();
    this.getLineData();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getScreenHeight);
  },
  computed: {
    newParame() {
      return this.parameterList.filter((v) =>
        this.tableParame.every((val) => val.McParameterKey != v.ParameterCode)
      );
    },
  },
  methods: {
    getData() {
      GetMCDeviceList().then((res) => {
        // console.log(res);
        this.tableData = this.listToTree(res.list);
      });
    },
    getLineData() {
      GetProductionLineList().then((res) => {
        this.lineList = res.list;
      });
    },
    changeLine(line) {
      // console.log(line);
      this.form.deviceName = line.Name;
      this.form.productionLine = line.ID;
      GetEquipmentList(JSON.stringify(line.ID)).then((res) => {
        // console.log(res);
        this.treeData = res.list;
      });
    },
    changeStatus(row) {
      let data = { ...row, operationType: "string" };
      data.updateuid = getToken();
      UpdateMCDevice(data).then((res) => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.getData();
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
        }
      });
    },
    changeStatus22(row) {
      // console.log(row);
      let data = { ...row, ProductName: "", operationType: "" };
      UpdateMcSetting(data).then((res) => {
        if (res.ResultCode == 200) {
          // this.getData();
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          //  this.getMcSetData(row.DeviceID);
        }
      });
    },
    handleDelete1(row) {
      //  console.log(row);
      let data = {
        ...row,
        userName: "string",
        operationType: "string",
      };
      // console.log(data);
      DeletSeettingDevice(data).then((res) => {
        if (res.ResultCode == 200) {
          // this.getData();
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getMcSetData(row.DeviceID);
          //  this.getMcSetData(row.DeviceID);
        }
      });
    },
    handleEdit(row) {
      // console.log(row);
      GetParameterSettingsList({
        id: "",
        parameterName: "",
        parameterCode: "",
        create_time: "2024-05-28T09:46:40.039Z",
        create_uid: "",
        update_uid: "",
        update_time: "2024-05-28T09:46:40.039Z",
        OperationType: "",
      }).then((res) => {
        this.parameterList = res.list;
        // console.log(res.list);
      });
      this.getMcSetData(row.DeviceCode);
      // this.form1.id=row.DeviceCode
      this.form1.deviceName = row.DeviceName;
      this.form1.deviceID = row.DeviceCode;
      this.form1.mcId = parseInt(row.DeviceCode);
      this.dialogEdVisible = true;
    },
    getMcSetData(id) {
      GetMcSettingList({
        id: "",
        deviceID: id,
        mcId: parseInt(id),
        mcParameterKey: "",
        mcSettingDes: "",
        mcParameterStatus: "",
        updateTime: "2024-05-29T05:08:39.272Z",
        userName: "",
        updateid: "",
        ProductName: "",
        operationType: "string",
      }).then((res) => {
        // console.log(res);
        this.tableParame = res.list || [];
      });
    },
    handleDelete(row) {
      let data = { ...row, operationType: "string" };
      data.updateuid = getToken();
      DeletMCDevice(data).then((res) => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
        }
      });
    },
    addCancel() {
      this.item = "";
      this.treeData = [];
      // this.dialogEdVisible=false
      this.dialogAdVisible = false;
      // console.log(111);
    },
    editCancel() {
      console.log(this.tableParame);
      this.dialogEdVisible = false;
    },
    addDetermine() {
      // console.log(this.form);
      let list = this.$refs.tree.getCheckedNodes();
      // console.log(list);
      list = list.map((item) => {
        return {
          id: "",
          deviceName: item.Name,
          deviceCode: item.AssetNumber,
          deviceEnable: "0",
          parentLevel: this.form.productionLine,
          childLevel: "",
          productionLine: this.form.productionLine,
          createuid: getToken(),
          createtime: "2024-05-28T09:46:40.039Z",
          updateuid: getToken(),
          ProductName: "",
          updatetime: "2024-05-28T09:46:40.039Z",
          ext: "",
          status: "1",
          OperationType: "",
        };
      });
      this.form.list = list;
      // console.log(this.form);
      MCDeviceAdd(this.form).then((res) => {
        // console.log(res);
        if (res.ResultCode == 200) {
          this.dialogAdVisible = false;
          this.item = "";
          this.treeData = [];
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          this.getData();
        }
      });
    },
    onSubmit() {
      // console.log(this.form1);
      this.form1.mcSettingDes = this.deviceName(this.form1.mcParameterKey);
      // console.log(this.form1.mcSettingDes);
      this.form1.operationType = "";
      this.form1.updateid = getToken();
      this.form1.ProductName = "";
      MCMcSettingAdd([this.form1]).then((res) => {
        // console.log(res);
        if (res.ResultCode == 200) {
          // this.getData();
          this.$refs.form1.resetFields();
          this.getMcSetData(this.form1.deviceID);
          this.$message({
            type: "success",
            message: this.$t("message.success"),
          });
          //  this.getMcSetData(row.DeviceID);
        }
      });
    },
    deviceName(text) {
      let decice = this.parameterList.find(
        ({ ParameterCode }) => text == ParameterCode
      );
      return decice.ParameterName;
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
        this.tableHeight = window.innerHeight - 220;

        //后面的50：根据需求空出的高度，自行调整
      });
    },
    listToTree(items) {
      // 创建一个映射来保存每个节点的引用
      const nodeMap = {};
      // 遍历所有节点，创建映射
      items.forEach((item) => {
        nodeMap[item.ID] = { ...item, list: [], level: 1 };
        // 初始化children数组
      });
      // console.log(nodeMap);
      // 遍历所有节点，填充children数组
      items.forEach((item) => {
        // 如果父级ID不是根节点（比如不是'0'或者null等）
        if (item.ParentLevel && nodeMap[item.ParentLevel]) {
          // 将当前节点添加到其父节点的children数组中
          nodeMap[item.ID].level++;
          nodeMap[item.ParentLevel].list.push(nodeMap[item.ID]);
        }
      });

      // 找出根节点（即没有ParentLevel或者ParentLevel为特定值的节点）
      // 这里假设ParentLevel为'0'的节点是根节点
      const tree = [];
      items.forEach((item) => {
        if (item.ParentLevel === "0" && nodeMap[item.ID]) {
          tree.push(nodeMap[item.ID]);
        }
      });

      // 返回树形结构
      return tree;
    },
  },
};
</script>

<style lang="scss" scoped>
.feature {
  padding: 10px;
}
::v-deep .el-dialog{
       display: flex;
       flex-direction: column;
       margin:0 !important;
       position:absolute;
       top:50%;
       left:50%;
       transform:translate(-50%,-50%);
       max-height:calc(100% - 30px);
       max-width:calc(100% - 30px);
   }
  ::v-deep  .el-dialog .el-dialog__body{
       flex:1;
       overflow: auto;
   }

</style>
