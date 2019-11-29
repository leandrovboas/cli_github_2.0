
const UserService = require('../../src/services/userService')
//const { GetRepos } = require('../../src/services/reposService')
const { ExibirInfoUser } = require('../../src/view/userView')
//const { ExibirRepos } = require('../../src/view/reposView') 
const { ExibirJson } = require('../../src/view/jsonView')
const {ExibirError} = require('../../src/view/errorView')

class UserCmd{
    constructor(userService = new UserService()){
        this.userService = userService
    }

    async GetInfoUser (userName, optionRepos, optionJson) {
        let userInfo,
            listRepos
        try {
            userInfo = await this.userService.GetInfoUsers(userName)
    
            // if (optionRepos != null) {
            //     listRepos = await GetRepos(userInfo.repos_url)
            // }
    
            if(optionJson !== undefined){
                userInfo.repos = listRepos
                ExibirJson(userInfo)
            }else{
                await ExibirInfoUser(userInfo)
                //await ExibirRepos(listRepos)
            }
        }catch(error)
        {
            ExibirError(`Gerou um erro interno ===> ${error}`)
        }
    }
}

module.exports = UserCmd