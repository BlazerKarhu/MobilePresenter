import * as Device from 'expo-device';
import Constants from "expo-constants";
import { Platform } from 'react-native';


// Used for converting special ip addresses to device specific ones.
export const convertIp = (ip) => {
    console.log("debug")

    if (Platform.OS == 'android') // Use localhost of the machine running the UI. 
    {
        // If in debug mode, use host as localhost
        if(Constants.manifest?.debuggerHost != null) {
            const hostIp = Constants.manifest?.debuggerHost.split(':',1)[0]
            return ip.replace("127.0.0.1", hostIp).replace("localhost", hostIp)
        }

        // If being run in emulator, but without debugging, then run on machine running the emulator.
        else if (!Device.isDevice) {
            return ip.replace("127.0.0.1", "10.0.2.2").replace("localhost", "10.0.2.2")
        } 

    }


    return ip

}