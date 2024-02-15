// Dependencies
const { MongoClient, ObjectId } = require("mongodb");

// Server URL
// const s_url = "mongodb+srv://NodeApp:C2FGwthfGr3hEzPM@test.v3cuzhq.mongodb.net/?retryWrites=true&w=majority";
// const s_url = "mongodb://localhost:27017/";
// const s_url = "mongodb://host.docker.internal:27017/";
const s_url = "mongodb://Sigma:Experi2ma@mongodb:27017/";

// Database
const database = "makkie";

// Initialize
const client = new MongoClient(s_url);

// Container
const mongo = {};

mongo["client"] = client
mongo["database"] = database
mongo["ObjectId"] = ObjectId


module.exports = mongo;


// Database: makkie
// Collections:
// users
// products
// trending
// newArrivals
// misc
// history
// pending


// {
//     _id: ObjectId('64f2830d5da8f9f86a0e593a'),
//     categories: [
//         'coats',
//         'scrubs',
//         'crocs',
//         'sneakers',
//         'penTorch',
//         'scrubCaps',
//         'brooches',
//         'cardHolders',
//         'shirts'
//     ],
//     sizes_1: {
//         Small: 'S',
//         Medium: 'M',
//         Large: 'L',
//         'X-Large': 'XL',
//         'XX-Large': 'XXL'
//     },
//     sizes_2: {
//         'Size 38': 38,
//         'Size 39': 39,
//         'Size 40': 40,
//         'Size 41': 41,
//         'Size 42': 42,
//         'Size 43': 43,
//         'Size 44': 44,
//         'Size 45': 45
//     },
//     colors: {
//         coats: [
//             'white'
//         ],
//         scrubs: [
//             'blue',
//             'brown'
//         ],
//         crocs: [
//             'navy',
//             'brown',
//             'fuchsia'
//         ],
//         sneakers: [
//             'blue'
//         ],
//         penTorch: [],
//         scrubCaps: [],
//         brooches: [
//             'red',
//             'gray',
//             'blue'
//         ],
//         cardHolders: [],
//         shirts: [
//             'black',
//             'blue',
//             'white'
//         ]
//     },
//     delivery: {
//         imo: 2500,
//         enugu: 3000,
//         abuja: 5000,
//         'port harcourt': 3500,
//         lagos: 10000,
//         benin: 5000
//     },
//     sex: [
//         'male',
//         'female',
//         'unisex'
//     ],
//     brand: {
//         coats: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         scrubs: [
//             'Adidas',
//             'D&G',
//             'Makkie'
//         ],
//         crocs: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         sneakers: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         penTorch: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         scrubCaps: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         brooches: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         cardHolders: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ],
//         shirts: [
//             'D&G',
//             'Makkie',
//             'Adidas'
//         ]
//     },
//     appColors: {
//         yellow: 'yellow',
//         green: 'green',
//         blue: 'blue',
//         red: 'red',
//         fuchsia: '#FF00FF',
//         navy: '#01153e',
//         gray: 'gray',
//         purple: '#311432',
//         pink: 'pink',
//         brown: '#3c280d',
//         black: '#000000',
//         lilac: '#cea2fd',
//         white: '#ffffff'
//     },
//     appBrands: [
//         'Adidas',
//         'D&G',
//         'Makkie'
//     ]
// }