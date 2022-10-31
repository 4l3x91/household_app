import { Text as PaperText } from "react-native-paper";
import { Text } from "react-native-svg";
import { AccessorFunctionProps, PieChart, PieChartData } from "react-native-svg-charts";

type Props = {
  data: Data[];
  size?: number;
  showAvatars: boolean;
};

export interface Data extends PieChartData {
  avatar?: string;
}

interface SliceProps {
  pieCentroid: number[];
  data: Data;
}

interface LabelProps {
  slices?: SliceProps[];
}

const Labels = ({ slices }: LabelProps) => {
  {
    return (
      <>
        {slices?.map((slice: SliceProps, index: number) => {
          const { pieCentroid, data }: SliceProps = slice;
          return (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
        })}
      </>
    );
  }
};

const PieChartComp = ({ data, size, showAvatars }: Props) => {
  if (data.length === 0) {
    return <PaperText>No data</PaperText>;
  } else {
    return (
      <PieChart
        style={{ height: size ? size : 270 }}
        valueAccessor={({ item }: AccessorFunctionProps<Data>) => item.value || 0}
        data={data}
        innerRadius={0}
        outerRadius={"90%"}
        padAngle={0}
      >
        {showAvatars ? <Labels /> : <></>}
      </PieChart>
    );
  }
};

export default PieChartComp;
