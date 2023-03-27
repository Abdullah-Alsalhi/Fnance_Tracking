import { gql } from '@urql/core';
import client from './client.js';

export const getAllItems = () => {
    return client
        .query(gql`
                query {
                    allItems {
                        id
                        name
                        brand {
                            id
                            name
                        }
                        
                    }
                }
            `)
        .toPromise();
}

export const getItems = (page) => {
    return client
        .query(gql`
                query {
                    items(page: ${page}) {
                        data {
                            id
                            name
                            brand {
                                id
                                name
                                }
                            }
                        paginatorInfo {
                            hasMorePages
                            }
                        }
                    }
                `)
        .toPromise();
}

export const createItem = ({ name, brandId }) => {
    return client
        .mutation(gql`
            mutation {
                createItem(name: """${name}""" brand_id: ${brandId}) {
                    id
                    name
                    brand {
                        id
                        name
                    }
                }
            }
        `)
        .toPromise();
}

export const updateItem = ({ id, name, brandId }) => {
    return client
        .mutation(gql`
            mutation {
                updateBrand(id: ${id} name: "${name}" brand_id: ${brandId}) {
                    id
                    name
                    brand {
                        id
                        name
                    }
                }
            }
        `)
        .toPromise();
}
