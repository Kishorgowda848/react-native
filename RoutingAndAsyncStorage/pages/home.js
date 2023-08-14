import React, { useState, useEffect }  from "react";
import {
  Alert,
         ScrollView,
         StyleSheet
         } from "react-native";
import { Text, Body, Button, CheckBox, Fab,Icon, Left, List, ListItem, Right, Title, Spinner } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused } from '@react-navigation/native';

const Home = ({navigation,route})=>{
    const [lists,setLists]=useState([]);
    const [loading,setLoading]=useState(false);
 
    const getList= async ()=>{
      setLoading(true);
      setLists(JSON.parse(await AsyncStorage.getItem("@seasonList")));
      setLoading(false)
    }
    const foucus=useIsFocused();
    useEffect(()=>{
      getList();
    },[foucus]);

    if(loading){
       return(
         <Spinner color="red"></Spinner>
       )
    }
    
    const deleteItem = async (id)=>{
        const list = lists.filter(ele=>ele.id!=id);
        await AsyncStorage.setItem('@seasonList',JSON.stringify(list))
        setLists(list)
    }

    const markActive = async (id)=>{
         lists.map(ele=>{
           if(ele.id==id){
            ele.watched=!ele.watched
           }
         })
         await AsyncStorage.setItem('@seasonList',JSON.stringify(lists));
         setLists(lists)
    }

    return(<>
      <ScrollView contentContainerStyle={styles.container}>
           {lists.map(season=>(
                  <List key={season.id}>
                      <ListItem>
                            <Left>
                              <Button onPress={()=>deleteItem(season.id)}>
                                <Icon  name="trash" ></Icon>
                              </Button>
                              <Button onPress={()=>{navigation.navigate("Add",season)}}>
                                <Icon name="edit"  type="Feather"></Icon>
                              </Button>
                            </Left>
                       <Body>
                          <Title>{season.name}</Title>
                          <Text note>{season.totalSeasons}</Text>
                       </Body>
                        <Right>
                            <CheckBox checked={season.watched} onPress={()=>markActive(season.id)}></CheckBox>
                        </Right>
                          </ListItem>
                  </List>
           ))}
           <Fab style={{backgroundColor:"red"}} onPress={()=>navigation.navigate("Add")}
              position="bottomRight">
             <Icon name="add"/>
           </Fab>
      </ScrollView>
    </>)
}

export default Home;

const styles = StyleSheet.create({
    container:{
        backgroundColor:"yellow",
        flex:1
    }
})