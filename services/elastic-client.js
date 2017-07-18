let esClient = require('../server/elastic_connection');
let config = require('../server/config');

var indexName = config.elasticsearch.index;

function indexExists() {
    return esClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initIndex() {
    return esClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

function deleteIndex() {
    return esClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

function initMapping() {
    return esClient.indices.putMapping({
        index: indexName,
        type: config.elasticsearch.house_type,
        body: {
            properties: {
                title: {
                    type: 'string'
                },
                address: {
                    type: 'string'
                },
                price: {
                    type: 'long'
                },
                range: {
                    type: 'string'
                },
                rate: {
                    type: 'long'
                },
                lat: {
                    type: 'float'
                },
                lng: {
                    type: 'float'
                },
                create_date: {
                    type: 'date'
                },
                suggest: {
                    type: 'completion',
                    analyzer: 'simple',
                    search_analyzer: 'simple'
                }
            }
        }
    });
}
exports.initMapping = initMapping;

function addHouse(house) {
    return esClient.index({
        index: indexName,
        type: config.elasticsearch.house_type,
        id: house._id.toString(),
        body: {
            title: house.title,
            description: house.description,
            address: house.address,
            price: house.price,
            image: house.image,
            range: house.range,
            rate: house.rate,
            status: house.status,
            lat: house.latitude,
            lng: house.longitude,
            create_date: house.create_date
        }
    });
}
exports.addHouse = addHouse;

function searchHouseWithPrice(text, pricefrom, priceto, page, size) {
    return esClient.search({
        index: indexName,
        type: config.elasticsearch.house_type,
        // from: page,
        // size: size,
        body: {
            query: {
                bool: {
                    must: {
                        match_phrase: {
                            address: text
                        }
                    },
                    filter: {
                        range: {
                            price: {
                                from: pricefrom,
                                to: priceto
                            }
                        },
                    },

                }
            },
            sort: {
                create_date: {
                    order: "desc"
                }
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
exports.searchHouseWithPrice = searchHouseWithPrice;

function searchHouseWithoutPrice(text, page, size) {
    return esClient.search({
        index: indexName,
        type: config.elasticsearch.house_type,
        // from: page,
        // size: size,
        body: {
            query: {
                match_phrase: {
                    address: text,
                }
            },
            sort: {
                create_date: {
                    order: "desc"
                }
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
exports.searchHouseWithoutPrice = searchHouseWithoutPrice;
function searchAllHouse(page, size) {
    return esClient.search({
        index: indexName,
        type: config.elasticsearch.house_type,
        from: 0,
        size: 10000,
        body: {
            query: {
                match_all: {}
            },
            sort: {
                create_date: {
                    order: "desc"
                }
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
exports.searchAllHouse = searchAllHouse;
function searchForHousePrice(pricefrom, priceto, page, size) {
    return esClient.search({
        index: indexName,
        type: config.elasticsearch.house_type,
        // from: page,
        // size: size,
        body: {
            query: {
                bool: {
                    filter: {
                        range: {
                            price: {
                                from: pricefrom,
                                to: priceto
                            }
                        },
                    },

                }
            },
            sort: {
                create_date: {
                    order: "desc"
                }
            }
        }
    }).catch(err => {
        console.log(err);
    })
}
exports.searchForHousePrice = searchForHousePrice;