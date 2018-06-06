<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'bar-sample',
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: { type: Object, default: () => {} },
    options: { type: Object, default: () => {} }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
