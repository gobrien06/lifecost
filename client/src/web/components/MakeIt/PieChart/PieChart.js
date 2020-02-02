import React, {Component} from 'react';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';

class PieChart extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[
        {
          "id": "junior",
          "label": "junior",
          "value": 20,
          "color": "#3f51b5"
      },
      {
          "id":"mid",
          "label": "mid",
          "value": 50,
          "color": "#ffeb3b"
      },
      {
        "id": "senior",
        "label": "senior",
        "value": 50,
        "color": "#ffa726"
      }

    ]
    }
  }

  componentDidMount(){
    //  this.getData();
  }

  getData(){
    const url = '/'+this.props.city+'/all/';
    axios.get('http://localhost:3001' + url)
    .then((response)=>{
      this.setState({
        data:[
          {
            "value":response.junior_quant,
          },
          {
            "value":response.mid_quant,
          },
          {
            "value":response.senior_quant,
          }
        ]
      })
    },
    (error)=>{
      console.log(error);
    }
    )

  }
render(){
  return(
    <ResponsivePie
  data={this.state.data}
  innerRadius={0.5}
  padAngle={0.7}
  cornerRadius={3}
  borderWidth={1}
  borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
  radialLabelsSkipAngle={10}
  radialLabelsTextXOffset={6}
  radialLabelsTextColor="#FFF"
  radialLabelsLinkOffset={0}
  radialLabelsLinkDiagonalLength={16}
  radialLabelsLinkHorizontalLength={24}
  radialLabelsLinkStrokeWidth={1}
  radialLabelsLinkColor={{ from: 'color' }}
  slicesLabelsSkipAngle={10}
  slicesLabelsTextColor="#000"
  animate={true}
  motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'junior'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'senior'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'mid'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#000',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
  )
}
}

export default PieChart;
