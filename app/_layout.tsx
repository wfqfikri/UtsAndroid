import { Stack } from "expo-router";

export default function Rootlayout(){
    return(
        <Stack 
            screenOptions={{headerShown : true,}}
        >
            <Stack.Screen name="index" options={{title : "EnemyAnime", headerTintColor : "blue", headerStyle : {backgroundColor : "black",}}}/>
            <Stack.Screen name="Animedetail" options={{title : "EnemyAnime", headerTintColor : "blue", headerStyle : {backgroundColor : "black",}}}/>

        </Stack>
    )
}  