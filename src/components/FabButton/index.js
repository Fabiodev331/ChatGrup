import React from "react";
import { 
    AreaButton,
    TextButton

} from "./styles";

function FabButton({ setVisible }){

    function handleNavigationButton(){
        setVisible()
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