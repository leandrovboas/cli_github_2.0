
const Github = require('../../../src/resource/github')
const RepoService = require('../../../src/services/reposService')
const { InfoRepo, ListRepos } = require('../../utils/factories')
const { ExibirError } = require('../../../src/view/errorView')

jest.mock('../../../src/view/errorView')

describe('Teste do repo Services', () => {
    let githubResouerce = new Github()
    let repoService = new RepoService()

    const FakerRequestReject = {
        get: () => Promise.reject({message:'Not Found'} )
    }

    const FakerRequestResolve = {
        get: () => Promise.resolve({data: InfoRepo})
    }

  test('Deve executar uma chamada no GetInfoRepo e retornar as info do Repositório', async () => {
        githubResouerce.request = FakerRequestResolve
        repoService.resource = githubResouerce

        const response = await repoService.GetInfoRepo('leandrovboas', 'cli_github')

        expect(InfoRepo).toMatchObject(response);
    })

    test('Deve executar uma chamada no GetInfoRepo e retornar um objeto vazio', async () => {
        githubResouerce.request = FakerRequestReject
        repoService.resource = githubResouerce

        const response = await repoService.GetInfoRepo('leandrovboas')

        expect(response).toEqual({})
    })

     test('Deve verificar se o metodo ExibirError foi chamado no repo service', async () => { 
        repoService.resource = {}

        await repoService.GetInfoRepo('leandrovboas', 'cli_githib')
  
        expect(ExibirError).toHaveBeenCalled()
    })

    test('Deve executar uma chamada no GetListRepo e retornar um objeto preenchido', async () => {

        const FakerRequestResolveList = {
            get: () => Promise.resolve({data: ListRepos})
        }
        githubResouerce.request = FakerRequestResolveList
        repoService.resource = githubResouerce

        const response = await repoService.GetListRepos('https://api.github.com/users/leandrovboas/repos',10)

        expect(response).toEqual(ListRepos)
    })

    test('Deve executar uma chamada no GetListRepo passando mais de 30 na quantidade de repos e retornar um objeto preenchido', async () => {

        const FakerRequestResolveList = {
            get: () => Promise.resolve({data: ListRepos})
        }
        githubResouerce.request = FakerRequestResolveList
        repoService.resource = githubResouerce

        const response = await repoService.GetListRepos('https://api.github.com/users/leandrovboas/repos',50)

        expect(response).toEqual(ListRepos.concat(ListRepos))
    })

    test('Deve executar uma chamada no GetListRepo passando mais de 30 na quantidade de repos e o metodo GetInfoGithub deve ser chamado mais de uma vez', async () => {

        const FakerRequestResolveList = {
            get: () => Promise.resolve({data: ListRepos})
        }
        githubResouerce.request = FakerRequestResolveList
        repoService.resource = githubResouerce

        const spy = jest.spyOn(githubResouerce, 'GetInfoGithub'); 
        await repoService.GetListRepos('https://api.github.com/users/leandrovboas/repos',50)

        expect(spy).toHaveBeenCalledTimes(2)
    })

    test('Deve executar uma chamada no GetListRepo passando menos de 30 na quantidade de repos e o metodo GetInfoGithub deve ser chamado apenas uma vez', async () => {

        const FakerRequestResolveList = {
            get: () => Promise.resolve({data: ListRepos})
        }
        githubResouerce.request = FakerRequestResolveList
        repoService.resource = githubResouerce

        const spy = jest.spyOn(githubResouerce, 'GetInfoGithub'); 
        await repoService.GetListRepos('https://api.github.com/users/leandrovboas/repos',10)

        expect(spy).toHaveBeenCalledTimes(1)
    })

    test('Deve executar uma chamada no GetListRepo e retornar um objeto vazio', async () => {
        githubResouerce.request = FakerRequestReject
        repoService.resource = githubResouerce

        const response = await repoService.GetListRepos('https://api.github.com/users/leandrovboas/repos',10)

        expect(response).toEqual([])
    })

     test('Deve verificar se o metodo ExibirError foi chamado no user service', async () => { 
        githubResouerce.request = FakerRequestReject
        repoService.resource = {}

        await repoService.GetListRepos('https://api.github.com/users/leandrovboas/repos', 10)
  
        expect(ExibirError).toHaveBeenCalled()
    })
})