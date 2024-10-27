import {atom} from 'recoil';

export const userAtom = atom({
    key:"UserInfoAtom",
    default:{
        isAuthenticated : false
    },
    effects:[
        ({setSelf, onSet}) => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            if(userInfo && userInfo.isAuthenticated){
                setSelf(userInfo);
            }

            onSet((newValue) => {
                setSelf(newValue);
                localStorage.setItem("userInfo", JSON.stringify(newValue));
            }) 
        }
    ]
});