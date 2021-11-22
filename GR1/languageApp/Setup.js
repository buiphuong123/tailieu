import * as React from 'react';
import App from './App';

const firebaseConfig = {
	"type": "service_account",
	"project_id": "languageapp-d3a70",
	"private_key_id": "7c7341271b3fa5ef393e352d08ae469c30a8d05a",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyOHIxK2ei5DSL\nfbYwNicp4vnK0dB2gKKMLOcCfmvLMEL3DjJAhMgfiSii6KPNWRuI+lPvGpFwSpT7\nzXJft9WsRSwMp4YRHcu6RGTYV6wFBGzL/DdyVopUvwaABEeb7ZF6nu2c8Ia3xAry\nv48aRWAr/W5GHX+XYkdU1bRKpKeRVkVpBu7VXK3WN1quyM+OXht9CBs18yofWMeX\nIgSARpVDr1OdQYrf6CmuyNPeekTr2l9k1rheTNDn2CpHi6DztuXFbYtVBSL4OY3K\nEZXpdpot1+6Pcdun83x4LtsTsJYkysFCRb7OHgU4T5RVoqNKAcaRSPS1ffzytZ/c\nM2qj+oa5AgMBAAECggEAC18BnjSERMbluV64gKP75LbINFIlyGHVvTbiOG0DiK/Y\nHfZIa4htUmHId3h7dw8v7BH4yAE8dVs03UoS+Zt7pSW2tUn9CluJ06UogAs7/Qf2\nvx8lFIUEB3s2uXVMclz6ksXQKFrKZbA6+JkTUtxJUhU184BPU0PghD+sZLTTwjiQ\n/THVbeqcZiYe0T44qykXRyu6sOHJvSHkby+1by/7lEvlnlVB/jAlrldd0UJ1tIYa\nrN0pPKQSyAVYtyobYngH62fAKZVqqbq9UR7lOVVAPudKunv7SF0JYDQzmSzmnAl8\nBe4YN3V+wPsocTQrXj+hB+RRBSMe5P6WeRSG4jXTmQKBgQDv6faeEx+fmqXFm9zu\nB4YZMXzK0te8J7SpK4ZnAmiNEzIp021+7zvoNpH/j9P7s3kVrO+lhCSkav4pmtPa\no0E4CrNU9GDK8FlqVxQYOJ/lMDKLI6qkxYu86b2yVwQzmg5jZ4yxu9pNqnAsTXCq\nDYvzgXuj0yMbLtNNpEDzYtDLFQKBgQC+K4l/NgHF+Yodg/8ErOhzatvcLk3uK9Mp\n9LS1d2nYyVTK4VCFj6CZ2CVuu2yWHbrAdeJ5zyYJKCSeKvAgZdypM+/HDivIVWtS\n73jkvn4k/LHenQyQCH8W/1SsIIbOyUyKdbrZHwQvpIe9uIIEWl4NnozyRLMZ1mei\nWRF6HhHmFQKBgGWuQ1e7wyth3+BgrsIzbiI/VySfN9AHBAqu58fAvY8NE7WmZkHm\nIv3IIxitXKrQ5gDJysfbuav1rML1W9TOXFXkMx1OdbeNJlhrj5i0ZxA73TAbbbdo\nAlGOv1dWifFU2cRHntm1RFCma+Ra7eUk2KvbtQs58ScUMXo2o1CEEPoBAoGAGuAw\nSGgri/0eRdmXuuNs3pLli5KHtPdAmpdYyqSbsuWRNDLvnFCWE+f2MlYOnJCLChQe\n87QQ3g5sTmYnFY0PyGHsqycXjPJ1fn0Vis5ZKYUE5j8vvVNWErv3DXRzWNoeFRta\nUsENaGZKQMfIqDDVRft4U+zdmvMwJkOMMsP5J5kCgYBSqBqPrd4wJ4FCZfPt1uP3\nPt+8/tJ6p8vgAYcKRacIuDIWb8K0+gwezATCYomB5FIngxZoMiWJWUoWkpbZG8+Y\nLlFU/1q0TVKWokLH2i4VlVDsRG2m0CMVw9EIqXopt+gwWfet0vd8zxtYUdYkz8L7\nM9Gii7lfsB1VLzBYhMZTng==\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-9sdzp@languageapp-d3a70.iam.gserviceaccount.com",
	"client_id": "103207242436654480753",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://oauth2.googleapis.com/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9sdzp%40languageapp-d3a70.iam.gserviceaccount.com"
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export {
    firebase,
    messaging,
  };

const Setup = () => {
    const onReceived = notification => {
        console.log('Notification received: ', notification);
      };
    
      const onOpened = openResult => {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
      };
      const onIds = device => {
        console.log('Device info: ', device);
      };
      React.useEffect(async () => {
        await inAppMessaging().setMessagesDisplaySuppressed(true);
        OneSignal.init('37c392d3-3799-46bc-ac37-e38da7fc740f', {
          kOSSettingsKeyAutoPrompt: false,
          kOSSettingsKeyInAppLaunchURL: false,
          kOSSettingsKeyInFocusDisplayOption: 2,
        });
        OneSignal.addEventListener('received', onReceived);
        OneSignal.addEventListener('opened', onOpened);
        OneSignal.addEventListener('ids', onIds);
    
        // It will trigger when app was in background
        messaging().onNotificationOpenedApp(remoteMessage => {
          //alert(JSON.stringify(remoteMessage));
        });
    
        // It will trigger when app was in quit mode
        messaging().getInitialNotification(remoteMessage => {
          // alert(JSON.stringify(remoteMessage));
        });
    
        // If App is in foreground mode
        messaging().onMessage(remoteMessage => {
          // alert(JSON.stringify(remoteMessage));
        });
        return () => {
            OneSignal.removeEventListener('received', onReceived);
            OneSignal.removeEventListener('opened', onOpened);
            OneSignal.removeEventListener('ids', onIds);
            unsubscribe();
          };
        }, []);
        return <App />;
    
};
export default Setup;