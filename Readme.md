Here's the cleaned up and formatted markdown documentation for the API, following standard conventions:

```markdown
# API Documentation

This document outlines the available endpoints for the Items, Item Types, and Transactions API.

## Base URL

All URLs referenced in the documentation have the following base:

```
http://localhost:8000/api
```

## Endpoints

### Items

#### Get All Items

- **GET** `/items`
- Returns a list of all items.

#### Get a Specific Item

- **GET** `/items/{id}`
- Returns details of a specific item.

#### Create a New Item

- **POST** `/items`
- Creates a new item.

#### Update an Item

- **PUT** `/items/{id}`
- Updates an existing item.

#### Delete an Item

- **DELETE** `/items/{id}`
- Deletes an item.

### Item Types

#### Get All Item Types

- **GET** `/item-types`
- Returns a list of all item types.

#### Get a Specific Item Type

- **GET** `/item-types/{id}`
- Returns details of a specific item type.

#### Create a New Item Type

- **POST** `/item-types`
- Creates a new item type.

#### Update an Item Type

- **PUT** `/item-types/{id}`
- Updates an existing item type.

#### Delete an Item Type

- **DELETE** `/item-types/{id}`
- Deletes an item type.

### Transactions

#### Get All Transactions

- **GET** `/transactions`
- Returns a list of all transactions.

#### Get a Specific Transaction

- **GET** `/transactions/{id}`
- Returns details of a specific transaction.

#### Create a New Transaction

- **POST** `/transactions`
- Creates a new transaction.

#### Update a Transaction

- **PUT** `/transactions/{id}`
- Updates an existing transaction.

#### Delete a Transaction

- **DELETE** `/transactions/{id}`
- Deletes a transaction.

## Response Format

The API returns JSON responses. Here are the structures for each resource:

### Item

```json
{
  "id": integer,
  "name": string,
  "stock": integer
}
```

### Item Type

```json
{
  "id": integer,
  "type": string
}
```

### Transaction

```json
{
  "id": integer,
  "item_id": integer,
  "sold_amount": number,
  "transaction_date": string (format: "YYYY-MM-DD"),
  "item_type_id": integer
}
```
```
