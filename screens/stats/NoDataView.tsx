import React from "react";
import { useTheme } from "react-native-paper";
import styled from "styled-components/native";

const NoDataView = () => {
  const { colors } = useTheme();
  return (
    <Container color={colors.primary}>
      <InfoHeader color={colors.primary}>Statistik saknas</InfoHeader>
      <InnerContainer>
        <InfoText color={colors.primary}>När du har markerat sysslor som klara, så kommer statistik visas här.</InfoText>
      </InnerContainer>
    </Container>
  );
};

export default NoDataView;

const Container = styled.View<{ color: string }>`
  padding: 20px 0;
  margin: 200px 50px 0 50px;
  align-items: center;
  border: 1px solid;
  border-color: ${(props) => props.color};
  border-radius: 15px;
`;

const InnerContainer = styled.View`
  margin: 30px 20px 0 20px;
  justify-content: center;
  align-items: center;
`;

const InfoHeader = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 30px;
`;

const InfoText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 17px;
`;
