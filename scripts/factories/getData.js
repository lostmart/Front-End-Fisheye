/* factory function to return data from the server   */

function getData(url) {
	/* async function to fetch data from server based on the url provided */
	const brigMeData = async () => {
		try {
			const res = await fetch(url)
			const photographers = await res.json()
			return photographers
		} catch (err) {
			alert("couldn't retreive data from server ... ")
			console.log(err.message)
		}
	}
	return { brigMeData }
}

export default getData
