import React from "react";
import { 
    AreaButton,
    TextButton

} from "./styles";

import { useNavigation } from "@react-navigation/native";

function FabButton({ setVisible, userStatus }){
    const navigation = useNavigation();

    function handleNavigationButton(){
    userStatus ? setVisible() : navigation.navigate("SignIn")
    }

    return(
        <AreaButton
        activeOpacity={0.8}
        onPress={handleNavigationButton}
        >
            <TextButton>+</TextButton>
        </AreaButton>
    )
}

export default FabButton;