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
          "value": 0,
      },
      {
          "id":"mid",
          "label": "mid",
          "value": 0,
      },
      {
        "id": "senior",
        "label": "senior",
        "value": 0,
      }

    ]
    }
  }

  componentWillReceiveProps(newProp){
      this.setState({
        career: newProp.career,
      })
      console.log("Received and used new props " + newProp.career);
      this.getData();
  }


  getData(){
    console.log("in the pie with: " + this.props.city + "and job: " + this.props.career);
    if(!this.props.city || !this.props.career){
      return;
    }
    const url = '/'+this.props.city+ '/'+this.props.career+'/all/';
    axios.get('http://localhost:80' + url)
    .then((response)=>{
      this.setState({
        data:[
          {
            "id": "junior",
            "label": "junior",
            "value":Number(response.data.entry_quant),
          },
          {
            "id": "mid",
            "label": "mid",
            "value":Number(response.data.mid_quant),
          },
          {
            "id": "senior",
            "label": "senior",
            "value":Number(response.data.senior_quant),
          }
        ]
      })
      console.log(this.state.data);
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
  color={{"scheme":"purpleRed_green"}}
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
