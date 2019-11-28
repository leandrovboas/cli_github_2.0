const Github = require('../resource/github')
const {ExibirError} = require('../view/errorView')

GithubResource = new Github()

class User {
    constructor(resource = GithubResource){
        this.resource = resource
    }

    async GetInfoUsers (userName) {
        try{
            const { data } = await this.resource.GetInfoGithub(`users/${userName}`)
            return data
            //  const { name, bio, company, repos_url } = data
            //  return {
            //      name,
            //      bio,
            //      company,
            //      repos_url
            //  }
        } catch (error) {
            ExibirError(`Ocorreu um problema para buscar as informações desse usuário - ${userName}`)
            ExibirError(`Acreditamos que o usuário ${userName} não exista na base do github`)
        }
    }
}


module.exports = User