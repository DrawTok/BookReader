
const User = require("./models/User");
const express = require('express');

const app = express();

// (async () => {
//     try {
//         const user = new User();
//         const infoUser = await user.updateUser(1, "Lê Thanh Hòa", "12/11/2003", "lth121103", "0321987");
//         console.log(infoUser);
//     } catch (error) {
//         console.error('Error executing additional query:', error);
//     }
// })();

// (async () => {
//     try {
//         const user = new User();
//         let isCreate = user.createUser("Lê Thanh Hòa", "12/11/2003", "lth121199", "0123456", "123456");
//         if (isCreate)
//             console.log("Successful")
//         else
//             console.log("Fail");
//     } catch (error) {
//         console.error('Error executing additional query:', error);
//     }
// })();

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});