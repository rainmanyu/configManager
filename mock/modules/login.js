// modules/login.js
const login = {
    url: "/login",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: {
                token:'token'
            }
        }
    }
}

const getUserInfo = {
    url: "/userinfo",
    type: "post",
    response: () => {
        return {
            code: 1,
            data: {
                avatar:'https://img1.baidu.com/it/u=984185799,2448847625&fm=26&fmt=auto',
                nickname:'admin',
                role:'super',
                createTime:'2021-12-11 13:15:00',
                email:'8888@qq.com',
                sex:0,
                account:'admin',
                indro:'admin'
            }
        }
    }
}



module.exports = [
    login,
    getUserInfo,

]