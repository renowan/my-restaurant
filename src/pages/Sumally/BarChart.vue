<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'bar-chart',
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: { type: Object, default: () => {} },
    options: { type: Object, default: () => {} }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
