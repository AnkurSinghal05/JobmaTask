import { PermissionsAndroid, Platform } from "react-native";




export const checkPermissions = async () => {
    if(Platform.OS=='ios'){
        return true
    }

    const apiLevel = Platform.Version

    if(apiLevel>29){
        return true
    }
    try {
        const permissionEnabled = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (permissionEnabled) {
            return true;
        } else {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        }
    } catch (err) {
        
    }
    
    return false;
}