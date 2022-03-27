<template>
  <div id="Home">
    <a-layout class="layout">
      <a-layout-header class="layout-header">
        <div class="header">
          <div class="title">数据总览</div>
          <div class="title-bottom">
            <div class="bottom-sidebar"></div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div class="main">
          <a-row type="flex" justify="center">
            <a-col class="main-left" :span="6">
              <a-row>
                <dv-border-box-1>
                  <scroll-rank :config="config"></scroll-rank>
                </dv-border-box-1>
              </a-row>
              <a-row>
                <a-col :span="8"
                  ><dv-active-ring-chart
                    :config="config2"
                    style=" height: 200px"
                /></a-col>
                <a-col :span="8"
                  ><dv-active-ring-chart
                    :config="config2"
                    style="height: 200px"
                /></a-col>
                <a-col :span="8"
                  ><dv-active-ring-chart
                    :config="config2"
                    style="height: 200px"
                /></a-col>
              </a-row>
              <a-row>
                <dv-conical-column-chart :config="config3" style="height:260px;" />
              </a-row>
            </a-col>
            <a-col class="main-center" :span="10">
              <Map></Map>
              <a-row class="bar-charts">
                   <hy-charts :chart-id="'chart2'" :type="'bar-chart'" :data="bar_data"></hy-charts>

              </a-row>
            </a-col>
            <a-col class="main-right" :span="6"> 
              <a-row>
                <dv-border-box-1>
                  <dv-capsule-chart :config="config4" style="width:450px;height:300px" />
                </dv-border-box-1>
              </a-row>
              <a-row class="hycharts">
                 <hy-charts :chart-id="'chart1'" :type="'multi-line-chart'" :data="line_data"></hy-charts>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
      <a-layout-footer class="layout-footer">
        <div class="bottom-line"></div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import Map from "./Echarts/Map.vue";
import ScrollRank from "./Echarts/Datav/ScrollRank.vue";
import hyCharts from './Echarts/Charts/hyCharts.vue'
export default {
  name: "Home",
  data() {
    return {
      config: {
        header: [],
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 78,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
          {
            name: "信阳",
            value: 45,
          },
          {
            name: "漯河",
            value: 29,
          },
        ],
        index: true,
        columnWidth: [200, 600, 700, 500],
        waitTime: 2000, // 轮播时间间隔(ms)
        align: "center", //文字对齐方式
        rowNum: 4,
        headerHeight: 40,
        headerBGC: "#fff",
        oddRowBGC: "#FFF",
        evenRowBGC: "#FFF",
      },
      config2:{
        data:[
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 78
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    }
  ],digitalFlopStyle: {
  fontSize: 12,
  fill: '#fff'
}
      },
      config3:{
        data: [
    {
      name: '周口',
      value: 55
    },
    {
      name: '南阳',
      value: 120
    },
    {
      name: '西峡',
      value: 71
    },
    {
      name: '驻马店',
      value: 66
    },
    {
      name: '新乡',
      value: 80
    },
    {
      name: '信阳',
      value: 35
    },
    {
      name: '漯河',
      value: 15
    }
  ], 
  showValue: true

      },
      config4:{
          data: [
    {
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 67
    },
    {
      name: '漯河',
      value: 123
    },
    {
      name: '郑州',
      value: 55
    },
    {
      name: '西峡',
      value: 98
    }
  ]

      },
        line_data: {},
          bar_data:  {
          xData: ['横坐标1', '横坐标2', '横坐标3', '横坐标4', '横坐标5', '横坐标6'], // 横坐标
          yData: [20, 30, 40, 50, 30, 44],  // 纵坐标
        },
    };
  },
  components: {
    Map,
    ScrollRank,
    hyCharts
  },
   async mounted() {
      let that = this;

      // 接口调用示例
      // this.$loading();
      // let res = await this.$request.post(this.$api.login, {});
      // console.log(res);
      // that.$loading.close();

      setTimeout(res => {
        that.initEcharts();
      }, 100)

      window.addEventListener('size', res => {

      })
    },
  methods: {
        initEcharts() {
        let that = this;
        that.line_data = {
          legend: ['图例1', '图例2'], // 图例
          xData: ['横坐标1', '横坐标2', '横坐标3', '横坐标4', '横坐标5', '横坐标6'], // 横坐标
          yData: [  // 纵坐标
            [20, 30, 40, 50, 30, 44],
            [22, 10, 30, 20, 15, 11]
          ]
        }

        that.bar_data = {
          xData: ['横坐标1', '横坐标2', '横坐标3', '横坐标4', '横坐标5', '横坐标6'], // 横坐标
          yData: [20, 30, 40, 50, 30, 44],  // 纵坐标
        }

        that.bar_stack_data = {
          legend: ['图例1', '图例2'], // 图例
          xData: ['横坐标1', '横坐标2', '横坐标3', '横坐标4', '横坐标5', '横坐标6'], // 横坐标
          yData: [  // 纵坐标
            [20, 30, 40, 50, 30, 44],
            [22, 10, 30, 20, 15, 11]
          ]
        }

        that.pie_data = [
          {name: '饼1', value: '20'},
          {name: '饼2', value: '24'},
          {name: '饼3', value: '40'},
          {name: '饼4', value: '30'},
        ]
      },

  }
};
</script>
<style lang="scss" scoped>
#Home {
  .layout,
  .layout-footer,
  .layout-header {
    background-color: transparent !important;
  }
  .header {
    margin: 4px;

    .title {
      font-size: 24px;
      color: #fff;
    }
    .title-bottom {
      height: 30px;
      justify-content: center;
      display: flex;
      .bottom-sidebar {
        width: 100%;
        height: 100%;
        opacity: 1;
        background-image: url("~@/assets/images/bottombar.gif");
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center center;
        width: 400px;
      }
    }
  }
  .bottom-line {
    width: 100%;
    height: 30px;
    background-image: url("~@/assets/images/bottomline.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .main-center{
    .bar-charts{margin-top: 30px;
      width: 100%;
   height: 250px;
    }
  }
  .main-right{
 .hycharts{
   margin-top: 70px;
   width: 100%;
   height: 400px;
 }
  }
}
</style>