import '../../keywords'

const datasets = [
{
 "featurename" : "Connexion valide_Nouveau compte valide_Créer un compte bancaire_Demander un paiement",
 "account_number" : "987654321",
 "login_password" : "s3cret",
 "bank_name" : "MyBank",
 "login_username" : "Katharina_Bernier",
 "routing_number" : "123456789"
}
]

datasets.forEach((dataset) => {

	describe('Créer un compte bancaire : ' + dataset.featurename, () => {
		it(dataset.featurename,() => {
			cy.openRWAApp();
			cy.signIn(dataset.login_username,dataset.login_password);
			cy.checkHomepage();
			cy.checkBankAccounts();
			cy.createBankAccount(dataset.bank_name,dataset.routing_number,dataset.account_number);
			cy.checkBankAccountCreation(dataset.bank_name);
		})

	})
})
