// import { tokens, ether, ETHER_ADDRESS } from './helpers'

const { assert } = require('chai')

const SchloadCoin = artifacts.require('./SchloadCoin')
const Location = artifacts.require('./Location')
const LocationFactory = artifacts.require('./LocationFactory')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('ContractName', ([acc1, acc2, acc3]) => {
	let schd
	let location
	let lf

	beforeEach(async () => {
		schd = await SchloadCoin.deployed()
		location = await Location.deployed()
		lf = await LocationFactory.deployed()
	})

	// describe('Locations', () => {
	// 	it('Can submit a review', async () => {
	// 		const comments = "its good";
	// 		const rating = 5

	// 		await location.addReview(comments, rating, {from: acc2})
	// 		let review = await location.reviews(0)
	// 		const reviewCount = await location.reviewCount();
	// 		assert.equal(comments, review.text, "Posted review matches submitted text")
	// 		assert.equal(`${rating}`, review.rating.toString(), "Posted rating matches submitted")
	// 		// assert.equal(reviewCount.toString(), '7')

	// 		const balance = await schd.balances(acc2)
	// 		assert.equal(balance.toString(), web3.utils.toWei('1', 'Gwei'))
	// 	})
	// })
	
	describe('Location Factory', async () => {
		it('Can create a new contract', async () => {
			const locationId = "12aba114-c7f0-4bb5-9d33-e7e4fdfb639a";
			const name = "podium_first_location";

			await lf.createLocation(name, locationId)
			const contractAddress = await lf.locations(locationId)
			let locationContract = new web3.eth.Contract(location.abi, contractAddress)

			const locId = await locationContract.methods.locationId().call()

			await locationContract.methods.addReview("did good", 4).send({
				from: acc2,
				value: web3.utils.toWei('0.02', 'ether')
			})

			console.log(await locationContract.methods.reviews(1).call())

			assert.equal(locationId, locId)
		})
	})
})