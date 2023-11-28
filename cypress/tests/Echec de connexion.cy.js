import '../../keywords'

const datasets = [
{
 "featurename" : "Connexion invalide_Nouveau compte valide_Créer un compte bancaire_Demander un paiement",
 "login_password" : "invalid",
 "login_username" : "invalid"
}
]

datasets.forEach((dataset) => {

	describe('Echec de connexion : ' + dataset.featurename, () => {
		it(dataset.featurename,() => {
			cy.openRWAApp();
			cy.signIn(dataset.login_username,dataset.login_password);
		})

	})
})
