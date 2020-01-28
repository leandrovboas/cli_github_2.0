class DadosRepos{
    constructor({name, clone_ur, description, html_url})
    {
        this.name = name,
        this.clone_ur = clone_ur,
        this.description = description,
        this.html_url = html_url
    }
}
module.exports = DadosRepos