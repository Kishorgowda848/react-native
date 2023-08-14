import axios from 'axios';
import React, { useState } from 'react';
import {View,Text,Image,Button} from 'react-native'
const App=()=>{
  const [profile,setProfile]=useState('');
  const [imageUrl,setImageUrl]=useState('');
  function getProfileInfoFromAPI(){
     axios.get('https://randomuser.me/api/?inc=gender,name,nat,picture').then(data=>{
      //  console.log(data.request._response)
       console.log(JSON.parse(data.request._response).results[0])
       setProfile(JSON.parse(data.request._response).results[0].name.first)
       setImageUrl(JSON.parse(data.request._response).results[0].picture.thumbnail)
      //  setName(data.request._response.results[0].name.first);
      //  setImageUrl(data.request._response.results[0].picture.large);
     })
  }
  useState(()=>{
    // console.log("Working");
    getProfileInfoFromAPI();
  })
  return(<>
     <View>
       <Image  source={{ uri: imageUrl, width:'50%',height:'50%'}}></Image>
        <Text>{profile}</Text>
        <Button
          onPress={() => getProfileInfoFromAPI()}
          title="Click Here to Next Picture"
          ></Button>
     </View>
     </>)
}
export default App;
