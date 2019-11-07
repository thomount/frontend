    <template>
        <div class="bar" id="bar">
        </div>
    </template>

    <script>
    export default {
        name : "Bar",
      //接收从父组件传回的值
        props: ["getData"],
        data() {
            return {};
        },
      //实时监听父组件传过来的值，进而执行drawBar方法，重绘柱状图
        watch:{
            getData:{
                handler(value){
                    this.drawBar(value)
                },
                deep: true
            }
        },
        mounted() {
            this.drawBar();
        },
        methods: {
            drawBar({
                textTitle  = "",
                nameTitle  = "",
                nameArray  = [],
                dataArray  = [],
                colorArray = []
                }          = {}) {
                let barBox = this.$echarts.init(document.getElementById("bar"));
                let option = {
                    title: {
                        text     : textTitle,
                        left     : "center",
                        top      : 20,
                        textStyle: {
                            color: "#000"
                        }
                    },
                    tooltip: {
                        trigger    : "axis",
                        axisPointer: {
                            type: "shadow" 
                        }
                    },
                    xAxis: [
                        {
                            type    : "category",
                            data    : nameArray,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value"
                        }
                    ],
                    series: [
                        {
                            name     : nameTitle,
                            type     : "bar",
                            barWidth : "60%",
                            data     : dataArray,
                            itemStyle: {
                                normal: {
                                    color: function(params) {
                                        var colorList = colorArray;
                                        return colorList[params.dataIndex];
                                    }
                                }
                            }
                        }
                    ]
                };
                barBox.setOption(option, true);
            }
        }
    };
    </script>
    <style scoped>
    </style>