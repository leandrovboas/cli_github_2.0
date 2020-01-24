class DadosUsuario{
    constructor({ name, bio, company, repos_url, public_repos })
    {
        this.name = name,
        this.bio = bio,
        this.company = company,
        this.repos_url = repos_url,
        this.QtdReposPublicos = public_repos
    }
}
module.exports = DadosUsuario