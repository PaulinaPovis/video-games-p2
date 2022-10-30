class User {

    constructor(userName,email,password,avatar){
        this.userName=userName;
        this.email= email;
        this.password= password;
        this.avatar= avatar;
    }

}

const user = new User();
module.exports={user};