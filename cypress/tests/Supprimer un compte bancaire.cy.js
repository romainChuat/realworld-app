import '../../keywords'

const datasets = [
{
 "featurename" : "Connexion valide_Nouveau compte valide_Créer un compte bancaire_Demander un paiement",
 "login_password" : "s3cret",
 "login_username" : "Katharina_Bernier"
}
]

datasets.forEach((dataset) => {

	describe('Supprimer un compte bancaire : ' + dataset.featurename, () => {
		it(dataset.featurename,() => {
			cy.openRWAApp();
			cy.signIn(dataset.login_username,dataset.login_password);
			cy.checkHomepage();
			cy.checkBankAccounts();
		})

	})
})
