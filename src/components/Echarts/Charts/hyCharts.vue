<template>
  <div class="chart-con">
    <template>
      <div class="chart-box" :id="'box'+this.chartId"></div>
    </template>

    <div v-show="type == 'table' && data.data.length == 0" class="no-data-body">暂无数据</div>
  </div>
</template>

<script type="text/ecmascript-6">
  const echarts = require('echarts');
  import {legendConfig, xAxisConfig, yAxisConfig} from "./hyChartsConfig";

  export default {
    name: 'hyCharts',
    data() {
      return {
        index: 0,
        multi_line_echart: null,  //【折线图】多条
        normal_bar_echart: null,  //【柱状图】普通
        hor_bar_echart: null,     //【柱状图】横向
        stack_bar_echart: null,   //【柱状图】堆叠
        doughnut_echart: null     //【饼状图】甜甜圈
      };
    },
    props: ['type', 'chartId', 'data', 'title', 'direction', 'showLenged'],
    watch: {
      data: {
        handler(val, oldVal) {  //深度监听 由于监听对象
          this.refreshEcharts(); // 根据传参决定加载什么图层
        },
        deep: true
      }
    },
    mounted() {

    },
    methods: {
      refreshEcharts() {
        switch (this.type) {
          case 'multi-line-chart': {
            this.initMultiLineEchart(this.data, 'box' + this.chartId);
            break;
          }
          case 'bar-chart': {
            this.initBarEcharts(this.data, 'box' + this.chartId);
            break;
          }
          case 'hor-bar-chart': {
            this.initHorizontalBarEchart(this.data, 'box' + this.chartId);
            break;
          }
          case 'stack-bar-chart': {
            this.initStackBarEcharts(this.data, 'box' + this.chartId);
            break;
          }
          case 'doughnut-chart': {
            this.initDoughnutEcharts(this.data, 'box' + this.chartId);
            break;
          }
        }
      },

      resizeCharts() {
        let that = this;
        if (that.multi_line_echart) that.multi_line_echart.resize();
        if (that.normal_bar_echart) that.normal_bar_echart.resize();
        if (that.hor_bar_echart) that.hor_bar_echart.resize();
        if (that.stack_bar_echart) that.stack_bar_echart.resize();
        if (that.doughnut_echart) that.doughnut_echart.resize();
      },

      /**
       * 【折线图】多条
       */
      initMultiLineEchart(res, chartId) {
        if (!res || res.length == 0) {
          return;
        }
        let lengeds = res['legend'];
        let xData = res['xData'];
        let yData = res['yData'];

        let colors = [
          {a: '#37A0D6', b: 'rgba(0,121,255,0.16)', c: 'rgba(205,240,255,0.18)'},
          {a: '#2FC25B', b: 'rgba(76,255,130,0.11)', c: 'rgba(76,255,130,0.18)'},
        ]

        let xAxis = xAxisConfig(xData);
        xAxis['boundaryGap'] = false;

        let series = [];
        for (let i in lengeds) {
          let colorInfo = colors[i % lengeds.length];
          series.push({
            name: lengeds[i],
            data: yData[i],
            type: 'line',
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(
            //       0, 0, 0, 1,
            //       [
            //         {offset: 0, color: 'rgba(6,171,212,0.2)'},
            //         {offset: 1, color: 'rgba(24,198,242,0)'}
            //       ]
            //     ) //改变区域颜色
            //   }
            // },
            symbol: 'circle',     //设定为实心点
            symbolSize: 0,   //设定实心点的大小
            smooth: true,  //这个是把线变成曲线
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: colorInfo['b'] // 0% 处的颜色
                }, {
                  offset: 1, color: colorInfo['c'] // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            itemStyle: {
              normal: {
                color: colorInfo['a'], //改变折线点的颜色
                lineStyle: {
                  color: colorInfo['a'] //改变折线颜色
                }
              }
            }
          })
        }

        let option = {
          grid: {
            left: 40, right: 40, top: 40, bottom: 30
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: legendConfig(lengeds),
          xAxis: xAxis,
          yAxis: yAxisConfig(),
          series: series
        };
        // 基于准备好的dom，初始化echarts实例
        if (!this.multi_line_echart) {
          this.multi_line_echart = echarts.init(document.getElementById(chartId));
        }
        // 绘制图表
        this.multi_line_echart.setOption(option);
      },

      /**
       * 【柱状图】普通
       */
      initBarEcharts(res, chartId) {
        let that = this;
        let xData = res['xData'];
        let yData = res['yData'];

        let option = {
          grid: {
            left: 65, right: 40, top: 15, bottom: 40
          },
          xAxis: xAxisConfig(xData, 40),
          yAxis: yAxisConfig(),
          series: [
            {
              type: 'bar',
              barWidth: 24,
              data: yData,
              itemStyle: {
                color: function (params) {
                  let colorList = ['#CAA3C8', '#E0F6A7', '#7FC4AD', '#37A0D6','#6CCDE6', '#FDC37F', '#FEDFC9']
                  return colorList[params.dataIndex % 7];
                },
                // barBorderRadius: 12
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              }
            }
          ]
        };
        // 基于准备好的dom，初始化echarts实例
        if (!that.normal_bar_echart) {
          that.normal_bar_echart = echarts.init(document.getElementById(chartId));
        }
        // 绘制图表
        that.normal_bar_echart.setOption(option);
      },

      /**
       * 【柱状图】横向
       */
      initHorizontalBarEchart(res, chartId) {
        let that = this;
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: 'gray',//左边线的颜色
                width: '0'//坐标线的宽度
              }
            },
            data: res[0],
            axisLabel: {
              textStyle: {color: 'rgba(0,0,0,0.65)', fontSize: 12}
            },
            splitLine: {show: false}
          },
          yAxis: {
            type: 'category',
            data: res[0],
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: 'rgba(28,102,155,1)',//左边线的颜色
                width: '0'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {color: 'rgba(0,0,0,0.65)', fontSize: 12}
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dash'
              }
            }
          },
          series: [
            {
              name: '数量',
              type: 'bar',
              data: res[1],
              color: '#66ccff',
              barWidth: 30
            }
          ]
        };
        // 基于准备好的dom，初始化echarts实例
        if (!that.hor_bar_echart) {
          that.hor_bar_echart = echarts.init(document.getElementById(chartId));
        }
        // 绘制图表
        that.hor_bar_echart.setOption(option);
      },

      /**
       * 【柱状图】堆叠
       */
      initStackBarEcharts(res, chartId) {
        let that = this;
        let lengeds = res['legend'];
        let xData = res['xData'];
        let yData = res['yData'];

        let colors = ['#69D388', '#58AFFF'];

        let series = [];
        for (let i in lengeds) {
          series.push({
            type: 'bar',
            name: lengeds[i],
            stack: 'one',
            barWidth: 30,
            data: yData[i],
            itemStyle: {
              color: colors[i],
              barBorderRadius: 0
            }
          })
        }

        let option = {
          grid: {
            left: 60, right: 20, top: 40, bottom: 40
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: legendConfig(lengeds),
          xAxis: xAxisConfig(xData, 40),
          yAxis: yAxisConfig(),
          series: series
        };
        // 基于准备好的dom，初始化echarts实例
        if (!that.stack_bar_echart) {
          that.stack_bar_echart = echarts.init(document.getElementById(chartId));
        }
        // 绘制图表
        that.stack_bar_echart.setOption(option);
      },

      /**
       * 【饼图】甜甜圈
       */
      initDoughnutEcharts(res, chartId) {
        let that = this;
        let total = 0;
        for (let i in res) {
          total += Number(res[i].value);
        }

        let option = {
          color: ['#3BA1FF', '#4FCB74', '#FBD438', '#F04864', '#00CED1', '#00FFFF', '#006400', '#20B2AA', '#00FF00', '#FFFF00', '#CD5C5C', '#F4A460', '#FA8072', '#FF0000', '#FF69B4', '#FF00FF', '#9400D3', '#FFF5EE', '#6959CD', '#63B8FF', '#87CEFF'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            show: this.showLenged,
            icon: 'circle',
            y: this.direction == 'row' ? 'center' : 'top',
            left: this.direction == 'row' ? '46%' : '0',  //图例距离左的距离
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: '#D9D9D9',
              fontSize: 20,
              rich: {
                name: {
                  align: 'left',
                  width: 80,
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.65)'
                },
                value: {
                  align: 'left',
                  width: 60,
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.45)'
                },
                count: {
                  align: 'left',
                  // width: 80,
                  fontSize: 14,
                  color: 'rgba(0,0,0,0.65)'
                }
              }
            },
            formatter: function (name) {
              if (res && res.length) {
                for (let i = 0; i < res.length; i++) {
                  if (name === res[i].name) {
                    return (
                      '{name|' + name + '}' +
                      '{value| ' + ((total > 0 ? (res[i].value) / total : 0) * 100).toFixed(0) + '%}'+
                      '{count| '+res[i].value+'}'
                    );
                  }
                }
              }
            }
          },
          series: [
            {
              name: ' ',
              type: 'pie',
              radius: ['45%', '60%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'center',
                formatter: function (params) {
                  let value = total + '总';
                  return [`{a|}\n{b|${value}}`];
                },
                rich: {
                  a: {
                    color: 'gray',
                    fontSize: 16,
                    lineHeight: 14
                  },
                  b: {
                    color: 'black',
                    fontSize: 24,
                    lineHeight: 25
                  }
                }
              },
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: '5'
                }
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              center: [this.direction == 'row' ? '22%' : '50%', '50%'],
              labelLine: {
                show: false
              },
              data: res
            }
          ],
        };
        // 基于准备好的dom，初始化echarts实例
        if (!that.doughnut_echart) {
          that.doughnut_echart = echarts.init(document.getElementById(chartId));
        }
        // 绘制图表
        that.doughnut_echart.setOption(option);
        // let index = 0;
        // this.doughnut_echart.dispatchAction({
        //   type: 'hideTip',
        //   seriesIndex: 0,
        //   dataIndex: index
        // });
        // // 显示提示框
        // this.doughnut_echart.dispatchAction({
        //   type: 'showTip',
        //   seriesIndex: 0,
        //   dataIndex: index
        // });
        // // 取消高亮指定的数据图形
        // this.doughnut_echart.dispatchAction({
        //   type: 'downplay',
        //   seriesIndex: 0,
        //   dataIndex: index == 0 ? 5 : index - 1
        // });
        // this.doughnut_echart.dispatchAction({
        //   type: 'highlight',
        //   seriesIndex: 0,
        //   dataIndex: index
        // });
        // // this.doughnut_echart.dispatchAction({type: 'highlight',seriesIndex: 0,dataIndex: 0});
        // this.doughnut_echart.on('mouseover', function (e) {
        //   that.doughnut_echart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: 0});
        //   if (e.dataIndex != that.index) {
        //     that.doughnut_echart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: that.index});
        //   }
        //   if (e.dataIndex == 0) {
        //     that.doughnut_echart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex});
        //   }
        // });
        //
        // //当鼠标离开时，把当前项置为选中
        // this.doughnut_echart.on('mouseout', function (e) {
        //   that.index = e.dataIndex;
        //   that.doughnut_echart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: e.dataIndex});
        // });
      }
    },

    // 进入路由时,恢复列表状态
    beforeRouteEnter(to, from, next) {  // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
      next(vm => {

      });
    }
  };

</script>

<style scoped>
  .chart-con {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .chart-box {
    width: 100%;
    height: 100%;
    padding: 10px 0 0 0;
  }

  .no-data-body {
    position: absolute;
    color: rgba(182, 220, 255, 1);
    font-size: 26px;
    top: 50%;
    left: 50%;
    margin-left: -75px;
    margin-top: -40px;
  }
</style>
