## ReactNativeWeb Boilerplate

Demo that utilizes React-Native and React-Native-Web for iOS, Android, and Web compatibility with one code base.

**Features**
 - [x] Navigation (react-router for Web and react-navigation for
       Android/iOS)      
 - [x] Connection to database using Fetch API
 - [x] Deploy react-native project to web using webpack and babel
 - [x] Deploy react-native project to android/ios using haul as development server and package bundler 
 - [x] Bundle dependencies across web/android/ios using lerna
 - [x] Integrated support for react-native component libraries (currently using components from react-native-material-ui,
       react-native-vector-icons, and react-native-textinput-effects)
**Demo**

**Installation**
*Node 9 or below is required due to existing issues with peer dependencies*

 1. Clone repository
 2. Install Yarn and Lerna   
 `npm install -g yarn`   
 `npm install -g lerna` 
 3. Navigate to repository and install dependencies 
`yarn`
 4. Bundle packages as dependencies 
`yarn bootstrap`

**Running in Web**
 1. Navigate to web package
 `cd packages/web`
 2. Run webpack server
 `yarn watch:web`
 3. Open http://localhost:3000 in your browser

**Running in Android/iOS**
1. Navigate to apps package
 `cd packages/apps`
 2. Start the haul server
 `yarn haul`
 3. Choose either the iOS, Android, or both option (if you are only testing on one, select that one to save time)
 4. In another terminal, navigate to apps package again 
 5. Run one of below script to either run on android or ios (emulator or device must be connected) 
`react-native run-android`
`react-native run-ios`

**Reloading JS**: If you make changes to the JS files, to see the changes on the emulator (Select emulator-> CTRL+M -> Select Reload)

**Disable Delta:** Select your emulator -> CMD + M, select Dev Setting and uncheck JS Deltas

**Troubleshooting**
If the build is successful, but you encounter **_“_****_Error: Activity class {com.apps/com.apps.MainActivity} does not exist”_**, there may be an issue with your android setup. For now, you can ignore this error, and  try **Disabling Delta** and **Reloading JS** by following instructions above.