const Github = require('../../src/resource/github')
const { ExibirError } = require('../../src/view/errorView')
const { InfoUser } = require('../utils/factories')

jest.mock('../../src/view/errorView')

describe('Github resource', () => {
  let githubResouerce = new Github()
  
    test('Realizando um chamada no github resourse', async () => {
        const fakerRequest = {
            get: () => Promise.resolve({data: InfoUser})
        }
        githubResouerce.request = fakerRequest
        const response = await githubResouerce.GetInfoGithub('users/leandrovboas')

        expect(InfoUser).toMatchObject(response);
    })

    test('Realizando um chamada no github resourse retornando erro', async () => {
        const fakerRequest = {
            get: () => Promise.reject({message:'Not Found'} )
        }

        githubResouerce.request = fakerRequest
        const response = await githubResouerce.GetInfoGithub('notFound');

        expect(response).toEqual('Not Found')
    })

    test('Deve verificar se o metodo ExibirError foi chamado', async () => { 
      const fakerRequest = {
        get: () => Promise.reject({response: {data:'Not Found', status: 404}} )
      }

      githubResouerce.request = fakerRequest
      await githubResouerce.GetInfoGithub('/teste');

      expect(ExibirError).toHaveBeenCalled()
  })
})