import * as Device from 'expo-device';
import Constants from "expo-constants";
import { Platform } from 'react-native';


// Used for converting special ip addresses to device specific ones.
export const convertIp = (ip) => {

    if (Platform.OS == 'android') // Use localhost of the machine running the UI. 
    {
        // If in debug mode, use host as localhost
        if(Constants.manifest?.debuggerHost != null) {
            const hostIp = Constants.manifest?.debuggerHost.split(':',1)[0]
            const localhostdigit = replaceAll(ip,"127.0.0.1", hostIp)
            return replaceAll(localhostdigit, "localhost", hostIp)
        }

        // If being run in emulator, but without debugging, then run on machine running the emulator.
        else if (!Device.isDevice) {
            const localhostdigit = replaceAll(ip, "127.0.0.1", "10.0.2.2")
            return replaceAll(localhostdigit,"localhost", "10.0.2.2")
        } 

    }

    return ip

}

export const revertIp = (ip) => {

    if (Platform.OS == 'android') // Use localhost of the machine running the UI. 
    {
        // If in debug mode, use host as localhost
        if(Constants.manifest?.debuggerHost != null) {
            const hostIp = Constants.manifest?.debuggerHost.split(':',1)[0]
            return replaceAll(ip, hostIp, "localhost")
        }

        // If being run in emulator, but without debugging, then run on machine running the emulator.
        else if (!Device.isDevice) {
            return replaceAll(ip, "10.0.2.2", "localhost")
        } 

    }

    return ip

}

const replaceAll = (target, find, replace) => {
    return target?.split(find).join(replace);
}