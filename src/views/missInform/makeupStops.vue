<template>
  <!-- <div :style="{ height: `${dashboardHeight}px` }"> -->
  <div class="smtinstpro">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('tableText.missQueries')" name="first">
        <el-form ref="form1" class="form1" :inline="true" :model="getDataText">
          <el-form-item :label="$t('tableText.order')">
            <el-input
              :placeholder="$t('tableText.order')"
              v-model="getDataText.orderName"
              class="input-with-select"
              style="width: 300px; margin-right: 20px"
            >
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('tableText.process')">
            <el-select
              v-model="getDataText.operationName"
              :placeholder="$t('tableText.process')"
            >
              <el-option
                v-for="item in lineType"
                :key="item.Number"
                :label="item.Name"
                :value="item.Number"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getData">{{
              $t("form.inquire")
            }}</el-button>
          </el-form-item>
        </el-form>
        <div class="data">
          <el-row :gutter="20">
            <el-col
              :span="6"
              class="item"
              v-for="(item, index) in missingList"
              :key="index"
            >
              <div>{{ item.SerialNumber }}</div>
              <el-button
                type="primary"
                size="mini"
                @click="toQuatrace(item.SerialNumber)"
                >跳转</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('tableText.MissReplacement')" name="second">
        <el-form
          ref="form"
          class="form"
          :rules="rules"
          label-width="auto"
          :model="form"
        >
          <el-form-item :label="$t('tableText.order')" prop="orderName">
            <el-input
              :placeholder="$t('tableText.order')"
              v-model="form.orderName"
              class="input-with-select"
              style="width: 300px; margin-right: 20px"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="PCBID" prop="pcbId">
            <el-input
              placeholder="pcbID"
              v-model="form.pcbId"
              class="input-with-select"
              style="width: 300px; margin-right: 20px"
            >
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="设备ID" prop="mcId">
        <el-input
          placeholder="设备ID"
          v-model="form.mcId"
          class="input-with-select"
          style="width: 300px; margin-right: 20px"
        >
        </el-input>
      </el-form-item> -->
          <el-form-item :label="$t('tableText.device')" prop="mcId">
            <el-select
              v-model.number="form.mcId"
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
          <el-form-item :label="$t('tableText.startTime')" prop="startTime">
            <el-date-picker
              v-model="form.startTime"
              value-format="yyyy-MM-ddTHH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              :placeholder="$t('tableText.selectTime')"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tableText.badCode')" prop="status">
            <el-select
              v-model="form.status"
              :placeholder="$t('tableText.badCode')"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('tableText.input') + $t('tableText.type')"
            prop="operationType"
          >
            <el-select
              v-model="form.operationType"
              :placeholder="$t('tableText.input') + $t('tableText.type')"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="$t(item.label)"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="entryData">{{
              $t("tableText.input")
            }}</el-button>
          </el-form-item>
        </el-form></el-tab-pane
      >
    </el-tabs>
  </div>
  <!-- </div> -->
</template>

<script>
import { BasicData, AddMissSN, MissSNs } from "@/api/all";

export default {
  data() {
    return {
      activeName: "first",
      getDataText: {
        orderName: "",
        operationName: "",
        operationType: "Q",
      },

      form: {
        orderName: "",
        pcbId: "",
        mcId: "",
        startTime: "",
        status: "PASS",
        operationType: "GI",
      },
      //   orderList: orderName(),
      statusList: [
        {
          value: "PASS",
        },
        {
          value: "FAIL",
        },
      ],
      typeList: [
        {
          value: "GI",
          label: "tableText.writeRout",
        },
        {
          value: "RI",
          label: "tableText.registerTicket",
        },
      ],
      lineType: [],
      machineType: [],
      rules: {
        orderName: [
          { required: true, message: "请输入工单名称", trigger: "blur" },
        ],
        pcbId: [
          { required: true, message: "请输入PCBID名称", trigger: "change" },
        ],
        mcId: [{ required: true, message: "请输入设备ID", trigger: "change" }],
        startTime: [
          { required: true, message: "请输入开始时间", trigger: "change" },
        ],
        status: [
          { required: true, message: "请输入不良代码", trigger: "change" },
        ],
        operationType: [
          { required: true, message: "请输入录入类型", trigger: "change" },
        ],
      },
      missingList: [],
    };
  },
  computed: {
    // ...mapState(["dashboardHeight"]),
  },
  beforeMount() {
    // this.dataInitialization();
  },
  mounted() {
    this.getBaisData();
  },
  methods: {
    getData() {
      MissSNs(this.getDataText).then((res) => {
        this.missingList = res.DataList;
      });
    },
    getBaisData() {
      BasicData({ operationType: "QA" }).then((res) => {
        // console.log(res);
        this.machineType = res.DataList;
        BasicData({
          operationType: "QO",
        }).then((res) => {
          // console.log(res);
          this.lineType = res.DataList;
        });
      });
    },
     toQuatrace(SerialNumber) {
      this.$router.push({ path: "/report/quatrace", query: { SerialNumber } });
    },
    entryData() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          AddMissSN(this.form).then((res) => {
            this.$message({
              type: "success",
              message: "补站成功!",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.smtinstpro {
  padding:0 10px;
  // .form{
  //    display: flex;
  //     justify-content: flex-end;
  // }
}

.data {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: grid;
  .item {
    height: 40px;
    display: flex;
    border: 1px solid;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
