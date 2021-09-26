// import React, { useState } from 'react'
// import { View, Text, Modal, TouchableOpacity } from 'react-native'

// const Profile = () => {
//     const [show, setShow] = useState(false);
//     return (
//         <View style={{flex: 1, marginTop: 100}}>
//             <Text style={{fontSize: 80}}>Normal screen text</Text>
//             <TouchableOpacity 
//                 style={{height: 50, width: 70, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}
//                 onPress={()=> setShow(true)}
//                 >
//                 <Text style={{color: '#fff'}}>show alert</Text>
//             </TouchableOpacity>
//              <Modal 
//                 transparent={true}
//                 visible={show}
//              >
//                 <View style={{backgroundColor: '#000000aa', flex: 1}}>
//                     <View style={{backgroundColor: '#ffffff', margin: 50, padding: 40, borderRadius: 10, flex: 1}}>
//                         <Text style={{fontSize: 50}}>Model text</Text>
//                         <TouchableOpacity 
//                             style={{height: 50, width: 70, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center'}}
//                             onPress={()=> setShow(false)}
//                             >
//                             <Text style={{color: '#fff'}}>close alert</Text>
//                         </TouchableOpacity>
//                     </View>

//                 </View>
//             </Modal>
//         </View>
//     )
// }
// export default Profile;

import React, { useState } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'

const Profile = () => {
    return (
        <View>
             <Text>profile screen kaka</Text>
        </View>
    )
}
export default Profile;