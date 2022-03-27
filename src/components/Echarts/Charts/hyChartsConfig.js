/**
 * @Description:
 * @Author licheng
 * @Date 2021/11/21 下午4:27
 */

export const legendConfig = (data) => {
  let config = {
    icon: 'circle',
    data: data,
    right: 0,
    top: 0,
    textStyle: {
      color: 'rgba(44,53,66,0.65)',
      fontSize: '12'
    }
  }
  return config;
}

export const xAxisConfig = (data, rotate) => {
  let config = {
    data: data,
    axisLabel: {
      textStyle: {color: 'rgba(0,0,0,0.65)', fontSize: 12},
      interval: 0,
    },
    axisLine: {
      lineStyle: {
        type: 'solid',
        color: '#333',//左边线的颜色
        width: '1'//坐标线的宽度
      },
    },
    splitLine: {show: false}
  }
  
  if (rotate) {
    config.axisLabel['rotate'] = rotate;
  }
  return config;
}

export const yAxisConfig = (data) => {
  let config = {
    axisLine: {show: false},
    axisLabel: {
      textStyle: {color: 'rgba(0,0,0,0.65)', fontSize: 12}
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dash'
      }
    },
    minInterval: 1
  }
  return config;
}

export const dataZoomConfig = () => {
  let config = [
    {
      show: false,
      realtime: true,
      start: 0,
      end: 100
    },
    {
      type: 'inside',
      realtime: true,
      start: 0,
      end: 100
    }
  ]
  return config;
}