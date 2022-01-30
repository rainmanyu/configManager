const getUserList = {
    url: "/userList",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:{
                list: [{
                    account:'admin',
                    avatar:'https://img1.baidu.com/it/u=984185799,2448847625&fm=26&fmt=auto',
                    role:'super',
                    email:'8888@qq.com',
                    nickname:'admin',
                    update_time:'2021-12-11 13:15:00',
                    password:'admin',
                    id:1
                },
                    {
                        account:'user',
                        avatar:'https://img2.baidu.com/it/u=108873797,3648956551&fm=26&fmt=auto',
                        role:'user',
                        email:'9999@qq.com',
                        nickname:'user',
                        password:'user',
                        update_time:'2021-12-11 13:20:00',
                        id:2
                    }],
                total:2
            }
        }
    }
}

const getOperatorList = {
    url: "/operatorList",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:{
                list: [


                ],
                total:2
            }
        }
    }
}

const getRoles = {
    url: "/roleList",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: [{
                id:1,
                name:'super'

            },{
                id:2,
                name:'user'

            }]
        }
    }
}

//删除管理员
const deleteUser={
    url: "/delUser",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'删除成功'
        }
    }
}

//添加管理员
const addUser={
    url: "/addUser",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'添加成功'
        }
    }
}


//编辑管理员
const editUser={
    url: "/editUser",
    type: "post",
    response: () => {
        return {
            code: 1,
            data:'',
            msg:'编辑成功'
        }
    }
}




module.exports = [
    getUserList,
    getOperatorList,
    getRoles,
    deleteUser,
    addUser,
    editUser,

]