var util = require('util');
const Github = require('../resource/github')
const DadosRapositoio = require('../module/dadosRepos')
const { ExibirError } = require('../view/errorView')

GithubResource = new Github()

class Repos {
    constructor(resource = GithubResource){
        this.resource = resource
    }

    async GetInfoRepo(userName, repoName){
        try{
            const { data } = await this.resource.GetInfoGithub(`repos/${userName}/${repoName}`)
            return new DadosRapositoio(data)
        }catch(error){
            ExibirError('Ocorreu um erro ao tentar consultar as informações do repositório')
            ExibirError(`Possivelmente o repo ${repoName} do usuário ${userName} não foi encontado`)
        }
    }

    async GetListRepos(repoUrl, qtdReposPublicos){
        let result = []
        try{
            for(var i = 1; qtdReposPublicos > 0; i++){
                const resultado = await this.resource.GetInfoGithub(`${repoUrl}?page=${i}`)
                result = result.concat( 
                    util.isArray(resultado.data) 
                    ? resultado.data.map((repo) => new DadosRapositoio(repo))
                    : []
                    )
                
                if(qtdReposPublicos < 30){
                    qtdReposPublicos = 0
                } else {
                    qtdReposPublicos = qtdReposPublicos - 30
                }
            }
            return result
        }catch(error){
            ExibirError(`Ocorreu um problema para buscar os repositórios na url ${repoUrl}`)
        }
    }
}

module.exports = Repos