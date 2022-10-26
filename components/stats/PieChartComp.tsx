import React from "react";
import { Text as PaperText } from "react-native-paper";
import { Text } from "react-native-svg";
import { PieChart, PieChartData } from "react-native-svg-charts";

export interface Data extends PieChartData {
  // key?: string;
  // amount?: number;
  avatar?: string;
  // svg?: {
  //   fill: string;
  // };
}
interface SliceProps {
  pieCentroid: number[];
  data: Data;
}

type Props = {
  data: Data[];
};

interface LabelProps {
  slices: SliceProps[];
}

const Labels = ({ slices }: LabelProps) => {
  {
    return slices.map((slice: SliceProps, index: number) => {
      const { pieCentroid, data }: SliceProps = slice;
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
  }
};

const PieChartComp = ({ data }: Props) => {
  if (data.length === 0) {
    return <PaperText>There is no data to display</PaperText>;
  } else {
    return (
      <PieChart style={{ height: 250 }} valueAccessor={({ item }) => item.value} data={data} innerRadius={0} padAngle={0}>
        <Labels slices={[]} />
      </PieChart>
    );
  }
};

export default PieChartComp;
