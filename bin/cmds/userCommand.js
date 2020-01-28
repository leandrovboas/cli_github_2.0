
const UserService = require('../../src/services/userService')
const RepoService = require('../../src/services/reposService')
const { ExibirInfoUser } = require('../../src/view/userView')
const { ExibirListaRepos } = require('../../src/view/reposView') 
const { ExibirJson } = require('../../src/view/jsonView')
const { ExibirError } = require('../../src/view/errorView')

class UserCmd{
    constructor(userService = new UserService(), repoService = new RepoService()){
        this.userService = userService
        this.repoService = repoService
    }

    async GetInfoUser (userName, optionRepos, optionJson) {
        let userInfo,
            listRepos
        try {
            userInfo = await this.userService.GetInfoUsers(userName)
    
            if (optionRepos !== undefined) {
                listRepos = await this.repoService.GetListRepos(userName, userInfo.QtdReposPublicos)
            }
    
            if(optionJson !== undefined){
                userInfo.repos = listRepos
                ExibirJson(userInfo)
            }else{
                await ExibirInfoUser(userInfo)
                if (listRepos)
                {
                    await ExibirListaRepos(listRepos)
                }
            }
            return userInfo
        }catch(error)
        {
            ExibirError(`Gerou um erro interno ===> ${error}`)
        }
    }
}

module.exports = UserCmd