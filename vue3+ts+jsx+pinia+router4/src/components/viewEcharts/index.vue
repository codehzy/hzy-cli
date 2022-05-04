<template>
  <div class="box">
    <div style="color: white" class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div class="center">
      <div class="center-top">
        <clock></clock>
      </div>
      <div id="china"></div>
    </div>
    <div style="color: white" class="right">
      <table cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>新增确诊</th>
            <th>累计确诊</th>
            <th>治愈</th>
            <th>死亡</th>
          </tr>
        </thead>
        <transition-group
          enter-active-class=" animate__animated animate__flip"
          tag="tbody"
        >
          <tr :key="item.name" v-for="item in store.item">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNovid19 } from '../../store/novid19'
import * as echarts from 'echarts'
import '../../assets/china'
import { geoCoordMap } from '../../assets/geoMap'
import 'animate.css'
import clock from './component/clock.vue'

const store = useNovid19()

/** 初始化图标 */
const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  store.item = city[1].children
  const charts = echarts.init(document.querySelector('#china') as HTMLElement)
  const data = city.map((item) => {
    return {
      name: item.name,
      value: geoCoordMap[item.name].concat(item.total.nowConfirm),
      children: item.children
    }
  })

  charts.setOption({
    geo: {
      map: 'china',
      aspectScale: 0.8,
      layoutCenter: ['50%', '50%'],
      layoutSize: '120%',
      itemStyle: {
        // normal: {
        areaColor: {
          type: 'linear-gradient',
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#152E6E' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0673AD' // 50% 处的颜色
            }
          ],
          global: true // 缺省为 false
        },
        shadowColor: '#0f5d9d',
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5
        // },
      },
      emphasis: {
        areaColor: '#0f5d9d'
      },
      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgba(0, 10, 52, 1)',
            borderColor: 'rgba(0, 10, 52, 1)',
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: '#009cc9'
            }
            // }
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12
          }
        }
      ]
    },
    series: [
      {
        type: 'map',
        map: 'china',
        aspectScale: 0.8,
        layoutCenter: ['50%', '50%'], //地图位置
        layoutSize: '120%',
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2
        },
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 12
        },
        itemStyle: {
          // normal: {
          areaColor: '#0c3653',
          borderColor: '#1cccff',
          borderWidth: 1.8
          // },
        },
        emphasis: {
          areaColor: '#56b1da',
          label: {
            show: true,
            color: '#fff'
          }
        },
        data: data
      },
      {
        name: 'Top 5',
        type: 'scatter',
        coordinateSystem: 'geo',
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          // normal: {
          show: true,
          color: '#fff',
          formatter(value: any) {
            return value.data.value[2]
          }
          // }
        },
        itemStyle: {
          // normal: {
          color: '#E0435D' //标志颜色
          // }
        },
        data: data
      }
    ]
  })

  charts.on('click', (e: any) => {
    store.item = e.data.children
  })
}

/** 左侧饼图 */
const initPie = () => {
  const charts = echarts.init(
    document.querySelector('.box-left-pie') as HTMLElement
  )
  charts.setOption({
    backgroundColor: '#223651',
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15'
          }
        },
        data: store.cityDetail.map((v) => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })
}

/** 左侧折线图 */
const initLine = () => {
  const charts = echarts.init(
    document.querySelector('.box-left-line') as HTMLElement
  )

  charts.setOption({
    backgroundColor: '#223651',
    title: {
      text: '新增确诊'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: store.cityDetail.map((v) => v.city),
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    label: {
      show: true
    },
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        data: store.cityDetail.map((v) => v.nowConfirm)
      }
    ]
  })
}

onMounted(async () => {
  /** 获取数据 */
  await store.getList()
  initCharts()
  initPie()
  initLine()
})
</script>
<style lang="scss" scoped>
$itemColor: #41b0db;
$itemBg: #223651;
$itemBorder: #212028;
.table {
  width: 100%;
  background-color: #212028;
  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }
    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
}
.box {
  height: 100%;
  display: flex;
  background-color: rgb(52, 50, 50);
  overflow: hidden;
  .box-left {
    width: 400px;
    .box-left-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
    }
    .box-left-pie {
      height: 240px;
      margin-top: 10px;
    }
    .box-left-line {
      height: 240px;
      margin-top: 10px;
    }
    section {
      background: $itemBg;
      border: 1px solid $itemBorder;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-child(2) {
        color: $itemColor;
        padding: 10px 0;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    flex-direction: column;
    .center-top {
      height: 100px;
      background-color: #1a232e;
    }
  }
  .right {
    width: 400px;
  }
}

#china {
  height: calc(100% - 100px);
}
</style>
