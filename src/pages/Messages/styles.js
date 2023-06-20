import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
flex: 1;
justify-content: center;
align-items: center;
background-color: #ddd;
`;

export const FlatList = styled.FlatList`
width: 100%;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
width: 100%;
`;

export const ContainerInput = styled.View`
flex-direction: row;
margin: 10px;
align-items: flex-end;
`;

export const MainInput = styled.View`
flex-direction: row;
align-items: center;
background-color: #FFF;
flex: 1px;
border-radius: 25px;
margin-right: 10px;
`;

export const TextInput = styled.TextInput`
flex: 1px;
margin-left: 10px;
margin-right: 10px;
max-height: 100px;
min-height: 48px;
`;

export const Button = styled.TouchableOpacity`
height: 48px;
`;

export const ButtonView = styled.View`
background-color: #2e54d4;
height: 48px;
width: 48px;
justify-content: center;
align-items: center;
border-radius: 25px;
`;
