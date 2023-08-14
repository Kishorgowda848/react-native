import React,{useState,useEffect} from "react";
import { Text,
    ScrollView,
    Alert,
    
 } from "react-native";
import { 
    Container,
    Button,
    Form, Input, Item,
 } from "native-base";
 import shortid from "shortid";
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Add = ({navigation,route})=>{
    const [name, setName]=useState('');
    const [totalSeasons, setTotalSeasons]=useState('');
    const [id,setId]=useState(false);
    const [watched,setWatched]=useState(false);
    const foucus=useIsFocused();
    let season

    useEffect(()=>{
       if(route.params)  
       season= route.params;
       if(season){
           const { id,name,totalSeasons,watched}=season;
           setId(id);
           setName(name)
           setTotalSeasons(totalSeasons);
           setWatched(watched);
       }
    },[foucus])

    const addSeason = async ()=>{
        try{
            const seasonsObj={
                id:shortid.generate(),
                name:name,
                totalSeasons:totalSeasons,
                watched:false
            }
            const  data = await AsyncStorage.getItem("@seasonList");
            const prevList = await JSON.parse(data)
            if(!prevList){
                 await AsyncStorage.setItem('@seasonList',JSON.stringify([seasonsObj]))
            }else{
                prevList.push(seasonsObj)
                 await AsyncStorage.setItem('@seasonList',JSON.stringify(prevList))
            }
            navigation.navigate("Home")
        }catch(e){
          console.log("Error in localstorage")
        }
    }

    const update = async () =>{
        const  data = await AsyncStorage.getItem("@seasonList");
        const  List = await JSON.parse(data);
        List.map(ele=>{
              if(ele.id==id){
                ele.name=name;
                ele.totalSeasons=totalSeasons;
                ele.watched=watched;
              }
              console.log(ele)
          return ele;
        })
        await AsyncStorage.setItem('@seasonList',JSON.stringify(List));
        navigation.navigate("Home")
    }

    return(
    <Container>
     <ScrollView>
         <Form>
             <Item>
               <Input placeholder="Name of seasons" value={name} onChangeText={(name)=>setName(name)} ></Input>
             </Item>
             <Item>
                <Input placeholder="Total number of seasons" value={totalSeasons} onChangeText={(totalSeasons)=>setTotalSeasons(totalSeasons)}></Input>
             </Item>
              {!id?(<Button  style={{width:300}} onPress={()=>addSeason()} ><Text>Add</Text></Button>):(
                 <Button  style={{width:300}} onPress={()=>update()} ><Text>Update</Text></Button> 
              )}
          </Form>
     </ScrollView>
     </Container>)
}

export default Add;
