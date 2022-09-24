# SJAPI(Simple JSON API)

This API can:

- Read users
- Update users
- Delete users
- Pop users(remove last user)
- Add users

---

API dosen't have any authorisation or protection.
All user data is stored inside Data.json.
To start a server open terminal with API directory in it and type `npm start` or by Using ServerStart.bat.
The server will open on port 7005 and you can access it in your browser by going to [here](http://localhost:7005).
To close the server use ServerKill.bat or type `npm stop` in CMD.

---

You can access the non-body requests here:

- [Get all users](http://localhost:7005/getAllUsers)
- [Get user by ID default 1](http://localhost:7005/getUser/1)
- [Pop an user](http://localhost:7005/popUser)
- [Remove an user by ID default 1](http://localhost:7005/removeUser/1)

---

These request require a body, I recommend to use [Insomnia](https://insomnia.rest/) for these or pure code: 

- Add a user: http://localhost:7005/addUser
- Update a user: http://localhost:7005/updateUser

---

API was made using *Node.js*,*Express.js*,*File System*
