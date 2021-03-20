// {
// 	"schemaPath": "./server/schema.graphql",
// 	"includes": ["**/*.graphql"],
// 	"extensions": {
// 		"endpoints": {
// 			"default": {
// 				"url": "http://localhost:5000/graphql",
// 				"introspect": true
// 			}
// 		}
// 	}
// }
module.exports = {
	projects: {
	  app: {
		schemaPath: "./server/schema.graphql",
		includes: ["**/*.graphql"],
		extensions: {
		  endpoints: {
			default: {
			  url: "http://localhost:5000/graphql",
			  introspect: true,
			},
		  },
		}
	  },
	}
}