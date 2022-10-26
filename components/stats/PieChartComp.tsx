import React from "react";
import { Text } from "react-native-svg";
import { PieChart } from "react-native-svg-charts";
// type Props = {};

const PieChartComp = (props: any) => {
  const data = [
    {
      key: 1,
      amount: 20,
      avatar: "🐍",
      svg: { fill: "#21a528" },
    },
    {
      key: 2,
      amount: 10,
      avatar: "🐷",
      svg: { fill: "#ee6ccd" },
    },
    {
      key: 3,
      amount: 15,
      avatar: "🦉",
      svg: { fill: "#442e18" },
    },
    {
      key: 4,
      amount: 10,
      avatar: "🦊",
      svg: { fill: "#77210b" },
    },
    {
      key: 5,
      amount: 5,
      avatar: "🐥",
      svg: { fill: "#e2b435" },
    },
  ];

  interface LabelProps {
    slices?: any;
    height: number;
    width: number;
    label: string;
  }

  const Labels = ({ slices }: LabelProps) => {
    return slices.map((slice: any, index: any) => {
      const { pieCentroid, data } = slice;
      console.log(pieCentroid);
      console.log(data);
      console.log(index);
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={"white"}
          textAnchor={"middle"}
          alignmentBaseline={"central"}
          fontSize={24}
          stroke={"black"}
          strokeWidth={0.2}
        >
          {data.avatar}
        </Text>
      );
    });
  };

  return (
    <PieChart style={{ height: 250 }} valueAccessor={({ item }) => item.amount} data={data} innerRadius={0} padAngle={0}>
      <Labels />
    </PieChart>
  );
};

export default PieChartComp;
