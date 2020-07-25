/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const http = require('http');

// wrap node's https.get stream call as a promise
// note: assumes utf-8 encoded data payload to get.
async function getdata(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.setEncoding('utf8');
      let data = '';
      res.on('data', (chunk) => {
        data = data + chunk;
	  });
      res.on('end', () => {
        resolve(data);
      })
    }).on('error', (e) => {
      reject(e);
	});
	req.end();
  });
}
async function setdata(options) {
	return new Promise((resolve, reject) => {
	  const req = http.request(options, (res) => {
		res.setEncoding('utf8');
		let data = '';
		res.on('data', (chunk) => {
			data = data + chunk;
		});
		res.on('end', () => {
		  resolve(data);
		})
	  }).on('error', (e) => {
		reject(e);
	  });
	  req.write(options.body);
	  req.end();
	});
  }
module.exports = {
	index: async function (request, response) {
		var options = {
			hostname: sails.config.custom.hostExternalAPI,
			port: 80,
			path: sails.config.custom.storesPath+'/'+sails.config.custom.storeId,
			method: 'GET',
			headers: {'accept': 'application/json'},
			timeout: 3000
		};
		try {
			var data = await getdata(options);
			// response available as `responseData`
			sails.log('Response',data);
			if(typeof data !== 'undefined' && data.indexOf('error') < 0){
				response.locals.responseData = JSON.parse(data);
				options.path = sails.config.custom.productsPath.replace('{idStore}',sails.config.custom.storeId);
				var dataProducts = await getdata(options);
				sails.log('ResponseProducts ',dataProducts);
				if(typeof dataProducts !== 'undefined' && dataProducts.indexOf('error') < 0){
					response.locals.responseDataProducts = JSON.parse(dataProducts);
				}else{
					response.locals.responseDataProducts =  'Products ' + dataProducts; // error
				}
			}else{
				return response.send('::Store:: '+data);
			}
			return response.view(
				'homepage', {
					version: '0.1',
					partials: {
						header: 'partials/header',
						footer: 'partials/footer',
						item: 'partials/item',
						modal: 'partials/modal',
					}
				}
			);
		} catch (error) {
			sails.log.warn('Could not parse response from options.hostname: ' + error);
		}

	},
	create: async function (request, response) {
		if(request.body){
			delete request.body._csrf;
		}
		var dataBody = JSON.stringify(request.body);
		sails.log('POST ',dataBody);
		var options = {
			hostname: sails.config.custom.hostExternalAPI,
			port: 80,
			path: sails.config.custom.productsPath.replace('{idStore}',sails.config.custom.storeId),
			body: dataBody,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': dataBody.length,
				'accept': 'application/json'
			},
			timeout: 3000
		};
		try {
			var data = await setdata(options);
			// response available as `responseData`
			sails.log('Response',data);

			return response.send(data);
			
		} catch (error) {
			sails.log.warn('Could not parse response from options.hostname: ' + error);
		}
		/*
		{
			"title": "string",
			"category": "string",
			"price": 0,
			"employee": "string",
			"description": "string"
		}*/
	},
	delete: async function (request, response) {
		sails.log('Delete ',request.query);
		var options = {
			hostname: sails.config.custom.hostExternalAPI,
			port: 80,
			path: sails.config.custom.productPath.replace('{idStore}',sails.config.custom.storeId).replace('{idProduct}',request.query.id),
			method: 'DELETE',
			headers: {'accept': 'application/json'},
			timeout: 3000
		};
		try {
			var data = await getdata(options);
			// response available as `responseData`
			sails.log('Response',data);

			return response.send(data);
			
		} catch (error) {
			sails.log.warn('Could not parse response from options.hostname: ' + error);
		}
	}

};

