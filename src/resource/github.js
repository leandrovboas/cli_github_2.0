const Axios = require('axios')
const { ExibirError } = require('../view/errorView')

const URL_BASE = 'https://api.github.com/'

class Github {
    constructor(request = Axios){
        this.request = request
    }

    async GetInfoGithub(urlPath){
        let response = {data: {}, error: ''};
        try{
            const {data} = await this.request.get(URL_BASE + urlPath)
            response.data = data
        }catch(error){
            const { message } = error
            response.error = message
            ExibirError(`=====> Message: ${message}`)
        }
        return response
    }
}

module.exports = Github