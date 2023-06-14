import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: rgba(34, 34, 34, 0.4);
`;

export const Modal = styled.View`
flex: 1;
`;

export const ModalContent = styled.View`
flex: 1;
background-color: #FFF;
align-items: center;
`;

export const Text = styled.Text`
padding-top: 20px;
font-size: 19px;
font-weight: bold;
color: #121212;
`;

export const TextInput = styled.TextInput`
width: 90%;
height: 45px;
background-color: #DDD;
margin-top: 20px;
margin-bottom: 20px;
border-radius: 5px;
font-size: 16px;
padding-left: 10px;
`;

export const ButtonCreate = styled.TouchableOpacity`
border-radius: 5px;
height: 45px;
width: 90%;
justify-content: center;
align-items: center;
background-color: #2e54d4;
`;

export const ButtonText = styled.Text`
color: #FFF;
font-size: 19px;
font-weight: bold;
`;