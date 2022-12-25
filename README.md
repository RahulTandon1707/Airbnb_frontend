In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

For installing node_modules in root folder,you should run:

###'npm i'

The above command will install node modules folder with almost all the necessary packages.
However,you need to install certain packages on your own.These packages and command to install them are:

    "@hookform/error-message": 'npm i @hookform/error-message' 
    "@mui/material": 'npm i @mui/material'
    "axios": 'npm i axios'
    "react-bootstrap": 'npm i react-bootstrap'
    "react-countup": 'npm i react-countup'
    "react-filter-search": 'npm i react-filter-search'
    "react-hook-form": 'npm i react-hook-form'
    "react-icons": 'npm i react-icons'
    "react-loading": 'npm i react-loading'
    "react-razorpay": 'npm i react-razorpay'
    "react-router-dom": 'npm i react-router-dom'
    "react-router-hash-link": 'npm i react-router-hash-link'
    "sweetalert2": 'npm i sweetalert2'
    
    If any package shows error in installing,just write --force in cmd which will ignore peer deps warnings of eslint
    Example:- If react-razorpay is not getting installed, then cmd should be like npm i react-razorpay --force
