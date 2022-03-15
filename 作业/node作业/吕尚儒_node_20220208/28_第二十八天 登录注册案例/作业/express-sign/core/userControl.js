const {decrypt, encrypt, generateKeys} = require('../util/util')
const fs = require('fs').promises
const {userPath} = require('../config')
const {getUserStatusMsg} = require('./statusControl')


module.exports = {
  //添加用户
  async addUser (username, pwd) {
    //公钥加密
    let password = encrypt(pwd)

    //查看数据库是否存在同名用户
    let user = await this.getUserInfo(username)

    //如果用户不存在， 则创建用户导入数据库
    if(user?.['tag'] === 'USER_NOF') {
      let userId = await getUsersNum()
      userId = ('000000' + userId).substring(-6)
      await appendUser({
        user_id: userId,
        user_name: username,
        password
      })
      return {
        ...getUserStatusMsg('USER_ADD')
      }
    }
    if (user?.['tag'] === 'USER_FOND') {
      return {
        ...getUserStatusMsg('USER_DR')
      }
    }
    return {
      statusCode: user.statusCode,
      errMsg: '注册失败'
    }
  },
  //获取用户信息
  async getUserInfo (username) {
    try {
      let users = await getUsers()
      console.log(users);
      //查找用户数组中有username相同的数据
      let userInfo = users.find(item => item['user_name'].trim() === username.trim())

      if(!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      return {
        ...getUserStatusMsg('USER_FOND'),
        data: {
          ...userInfo
        }
      }
    } catch (err) {
      console.error(err);
      return {
        ...getUserStatusMsg('USER_FERR')
      }
    }
  },
  //验证Token信息
  async verifyToken (username, userID) {
    try {
      let users = await getUsers()
      let userInfo = users.find(item => item['user_id'.trim() === userID.trim()])
      //如果用户不存在
      if(!userInfo) {
        return {
          ...getUserStatusMsg('USER_NOF')
        }
      }
      //如果用户存在
      if(userInfo['user_name'] === username) {
        return {
          ...getUserStatusMsg('USER_FOND')
        }
      }
    } catch(err) {
      console.error(err);
      return {
        //用户查询错误
        ...getUserStatusMsg('USER_FERR')
      }
    }
  },
  //验证用户 密码
  async verifyUser (username, pwd) {
    let user = await this.getUserInfo(username)
    //如果查询不成功
    if(user?.['tag'] !== 'USER_FOND') {
      return user
    }

    let {user_id, password, user_name} = user.data

    //验证密码 数据库中存的数据经过二次加密  和 一次加密的传输数据对比
    let isVerify = decrypt(decrypt(password.trim())) === decrypt(pwd.trim())
    if(isVerify) {
      return {
        ...getUserStatusMsg('USER_INN'),
        data: {
          user_id,
          user_name
        }
      }
    }
  }
}


//读取数据库 获取数组所有用户信息
async function getUsers () {
  try {
    let users = await fs.readFile(userPath, 'utf8')
    users = JSON.parse(users)
    return users
  } catch (err) {
    console.error(err);
    return false
  }
}

//传入用户数组 写入数据库
async function setUsers (users) {
  try {
    await fs.writeFile(userPath, JSON.stringify(users), 'utf-8')
  } catch (err) {
    console.error(err);
    return false
  }
}


//单个用户信息拼接到用户数组 并写入数据库
async function appendUser ({user_id = false, user_name = false, password = false}) {
  let user = await getUsers()
  user.push({
    user_id, 
    user_name, 
    password
  })
  await setUsers(user)
}


//获取用户数组长度
async function getUsersNum() {
  let users = await getUsers()
  return users?.length
}

