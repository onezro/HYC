<template>
  <div class="masterControl">
    <div class="header_box">
      <div class="box">
        <el-card shadow="always" :body-style="{ padding: '10px' }">
          <div slot="header">
            <span>强制停机</span>
          </div>
          <div class="box_left">
            <el-form
              :model="form"
              label-width="100px"
              ref="form"
              :inline="false"
              size="normal"
            >
              <el-form-item label="线体：">
                <el-select
                  v-model="form.order"
                  @change="change"
                  filterable
                  placeholder="点击选择"
                >
                  <el-option
                    v-for="item in workOrderList"
                    :key="item.id"
                    :label="item.lineType"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备：">
                <el-select
                  v-model="form.equipment"
                  @change="change"
                  filterable
                  placeholder="点击选择"
                >
                  <el-option
                    v-for="item in equipmentList"
                    :key="item.id"
                    :label="item.equipment"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">停机</el-button>
              </el-form-item>
            </el-form>
            <div>
              <el-table size="mini" :data="tableData" border stripe>
                <el-table-column prop="user" label="线体"> </el-table-column>
                <el-table-column prop="user" :label="$t('tableText.device')"> </el-table-column>
                <el-table-column prop="user" label="操作人"> </el-table-column>
                <el-table-column prop="user" label="操作时间">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- card body -->
        </el-card>
      </div>
      <div class="box">
        <el-card shadow="always" :body-style="{ padding: '10px' }">
          <div slot="header">
            <span>工单产品停机</span>
          </div>
          <div>
            <el-form
              :model="form1"
              ref="form"
              :inline="false"
              label-width="100px"
              size="normal"
            >
              <el-form-item label="类型：">
                <el-select
                  v-model="form1.manner"
                  @change="change2"
                  filterable
                  placeholder="点击选择"
                >
                  <el-option
                    v-for="item in controlType"
                    :key="item.id"
                    :label="item.lable"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工单/产品号：">
                <el-select
                  v-model="form1.pn"
                  @change="change2"
                  filterable
                  placeholder="点击选择"
                >
                  <el-option
                    v-for="item in itemList"
                    :key="item.order"
                    :label="item.order"
                    :value="item.order"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">停机</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- card body -->
        </el-card>
      </div>
    </div>
    <el-card shadow="always" :body-style="{ padding: '10px' }">
      <div slot="header">
        <span>参数启用控制</span>
      </div>
      <div>
        <el-form
          :model="form1"
          ref="form"
          :inline="false"
          label-width="100px"
          size="normal"
        >
          <el-form-item label="MC：">
            <el-select
              v-model="form1.manner"
              @change="change2"
              filterable
              placeholder="点击选择"
            >
              <el-option
                v-for="item in machineType"
                :key="item.id"
                :label="item.lable"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="检查参数：">
            <el-select
              v-model="form1.pn"
              @change="change2"
              filterable
              placeholder="点击选择"
            >
              <el-option
                v-for="item in checkList"
                :key="item.order"
                :label="item.order"
                :value="item.order"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
            <!-- <el-button type="primary" @click="onSubmit">停机</el-button> -->
          </el-form-item>
        </el-form>
      </div>
      <!-- card body -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        order: "",
        equipment: "",
      },
      tableData: [],
      value: "",
      workOrderList: [
        {
          id: 1,
          lineType: "Line1",
        },
        {
          id: 2,
          lineType: "Line2",
        },
        {
          id: 3,
          lineType: "Line3",
        },
        {
          id: 99,
          lineType: "All",
        },
      ],
      equipmentList: [
        {
          id: "AOI",
          equipment: "AOI",
        },
        {
          id: "SPI",
          equipment: "SPI",
        },
        {
          id: "Printer",
          equipment: "Printer",
        },
        {
          id: "Reflow",
          equipment: "Reflow",
        },
      ],
      form1: {
        manner: "",
        pn: "",
      },
      controlType: [
        {
          id: "P",
          lable: "产品",
        },
        {
          id: "W",
          lable: "工单",
        },
      ],
      itemList: [],
      machineType: [
        {
          id: 101,
          lable: "SPI",
        },
        {
          id: 102,
          lable: "Mounter",
        },
        {
          id: 103,
          lable: "Printer",
        },
        {
          id: 104,
          lable: "M-AOI",
        },
      ],
      checkList: [
        {
          order: "当前工单",
        },
        {
          order: "工单产品",
        },
        {
          order: "生命周期",
        },
        {
          order: "前工序时间",
        },
      ],
    };
  },
  watch: {
    "form1.manner"(oldValue, newValue) {
      if (oldValue !== newValue) {
        //   console.log(1);
        this.form1.pn = "";
      }
      //   console.log(oldValue,newValue);
    },
  },
  methods: {
    setValueNull(val) {
      this.value_ = null;
    },

    change() {},
    change2(value) {
      //   console.log(value);
      if (value == "P") {
        this.itemList = [
          {
            order: "4050211799800",
          },
          {
            order: "4050211799801",
          },
          {
            order: "4050211799802",
          },
        ];
      } else {
        this.itemList = [
          {
            order: "WO2024042501",
          },
          {
            order: "WO2024042502",
          },
          {
            order: "WO2024042503",
          },
        ];
      }
    },
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
.masterControl {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  // .header_box {
  //   display: flex;
  //   gap: 10px;
  //   .box {
  //     flex: 1;
      .box_left {
        display: flex;
        gap: 10px;
      }
    // }
  // }
}
</style>
