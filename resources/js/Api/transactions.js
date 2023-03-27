import { gql } from '@urql/core';
import client from './client.js';

export const getTransactions = (page) => {
    return client
        .query(gql`
                query {
                    transactions(page: ${page}) {
                        data {
                            id
                            amount
                            created_at
                            note
                            brand {
                                id
                                name
                                category {
                                    name
                                    type
                                    color
                                }
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

export const createTransaction = ({ amount, brandId, createdAt, note, itemId }) => {
    return client
        .mutation(gql`
            mutation {
                createTransaction(amount: ${amount} brand_id: ${brandId} created_at: """${createdAt}""" note: """${note}""" item_id: ${1}) {
                    id
                    amount
                    created_at
                    note
                    brand {
                        id
                        name
                        category {
                            id
                            name
                            type
                            color
                        }
                    }
                }
            }
        `)
        .toPromise();
}

export const updateTransaction = ({ id, amount, brandId, createdAt, note, itemId }) => {
    return client
        .mutation(gql`
            mutation {
                updateTransaction(id: ${id} amount: ${amount} brand_id: ${brandId} created_at: """${createdAt}""" note: """${note}""" item_id: ${itemId}) {
                    id
                    amount
                    created_at
                    note
                    brand {
                        id
                        name
                        category {
                            name
                            type
                        }
                    }
                    item {
                        id
                        name
                    }
                }
            }
        `)
        .toPromise();
}
