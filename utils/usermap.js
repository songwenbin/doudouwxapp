function SearchUser(nickname) {
  var usermap= {
    "rootree" :{
      username:'songwenbin@outlook.com',
      password:'songwenbin'
    },
    "孙和颂" : {
      username:'sunlifang@test.com',
      password:'sunlifang'
    },
    "李林" : {
      username:'lilin@test.com',
      password:'lilin'
    },
    "杜江南" : {
      username:'dujiangnan@test.com',
      password:'dujiangnan'
    },
    "Zhong_J" : {
      username:'zhong_j@test.com',
      password:'zhong_j'
    },
    "Megy Chen" : {
      username:'megychen@test.com',
      password:'megychen'
    },
  }
  return usermap[nickname]
}

module.exports = {
  SearchUser: SearchUser  
}
