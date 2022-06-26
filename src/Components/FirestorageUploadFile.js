import { storage } from "./FirebaseSetup";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { log } from "react-native-reanimated";


export const uploadFilesOnFirestorage = (setLoader, photoId, blobObj) => {

    setLoader(true)
    const storageRef = ref(storage, 'audit/' + photoId);
    const metadata = {
        contentType: 'image/jpeg',
    };

    const uploadTask = uploadBytesResumable(storageRef, blobObj, metadata);

    return new Promise(function (resolve, reject) {
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            async (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':

                        console.log('Upload is paused');
                        break;
                    case 'running':

                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        reject(error)
                        break;
                    case 'storage/canceled':
                        reject('User canceled the upload')

                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        reject('Unknown error occurred')

                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setLoader(false)
                    resolve(downloadURL);

                });
            }
        );

    })


}
