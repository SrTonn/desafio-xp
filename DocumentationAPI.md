## API Reference

#### Create account

```http
  POST /account/new
```

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `nickName`  | `string` |  Your nick name                 |
| `firstName` | `string` | **Required**. Your first name   |
| `lastName`  | `string` | **Required**. Your last name    |
| `email`     | `string` | **Required**. Your email        |
| `password`  | `string` | **Required**. Your password     |

##### Preview return
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXvCJ9..."
```

#### Get token login
```http
  POST /account/login
```

| Parameter    | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `email`      | `string` | **Required**. email of your account    |
| `password`   | `string` | **Required**. password of your account |

##### Preview return
```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXvCJ9..."
```

#### Update account data
```http
  PUT /account/update
```
##### ⚠️ At least one is **required**. ⚠️
| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `nickName`   | `string` | New nick name to your account   |
| `email`      | `string` | New email to your account       |
| `password`   | `string` | New password to your account    |

##### Preview return
```json
{
  "nickName": "curry",
  "firstName": "Ollie",
  "lastName": "Bryant",
  "email": "ollie.bryant@gmail.com"
}
```

#### Get infos about account
```http
  GET /account/me
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `nickName`   | `string` | New nick name to your account   |
| `email`      | `string` | New email to your account       |
| `password`   | `string` | New password to your account    |

##### Preview return
```json
{
  "nickName": null,
  "firstName": "Ollie",
  "lastName": "Bryant",
  "email": "ollie.bryant@gmail.com",
  "createdAt": "2022-07-24T14:03:54.000Z",
  "updatedAt": "2022-07-24T14:03:54.000Z"
}
```

#### Delete account
```http
  DELETE /account/remove/me
```

#### Get balance
```http
  GET /wallet/balance
```
| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `nickName`   | `string` | New nick name to your account   |
| `email`      | `string` | New email to your account       |
| `password`   | `string` | New password to your account    |

##### Preview return
```json
{
  "balance": 49056.84,
  "currentAssets": 790.88,
  "details": {
    "totalDeposit": 50000,
    "totalWithdraw": 350,
    "totalAssetsBought": 692.02,
    "totalAssetsSold": 98.86
  },
  "activeStocks": [
    {
      "stockCode": "XPBR31",
      "availableQuantity": 8,
      "investedAmount": 790.88
    }
  ]
}
```
#### Request deposit
```http
  POST /wallet/deposit
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `value`      | `number` | **Required**. Deposit value     |

##### Preview return
```json
{
  "success": true
}
```
#### Request withdraw
```http
  POST /wallet/withdraw
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `value`      | `number` | **Required**. Withdraw value     |

##### Preview return
```json
{
  "success": true
}
```

#### Get wallet history
```http
  GET /wallet/history
```

##### Preview return
```json
[
  {
    "value": 5000,
    "type": "deposit",
    "createdAt": "2022-07-24T22:04:22.000Z"
  },
  {
    "value": 692.02,
    "type": "buyAssets",
    "createdAt": "2022-07-24T22:04:30.000Z"
  },
  {
    "value": 98.86,
    "type": "sellAssets",
    "createdAt": "2022-07-24T22:04:32.000Z"
  },
  {
    "value": 350,
    "type": "withdraw",
    "createdAt": "2022-07-24T22:04:37.000Z"
  }
]
```

#### Buy assets
```http
  POST /investment/buy
```

| Parameter    | Type     | Description                     |
| :----------- | :------- | :------------------------------ |
| `stock`      | `string` | **Required**. Code of stock     |
| `value`      | `number` | **Required**. Investment value  |

##### Preview return
```json
{
  "stockBought": 7,
  "investedAmount": 692.02,
  "change": 7.98
}
```

#### Sell assets
```http
  POST /investment/sell
```

| Parameter    | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `stock`      | `string` | **Required**. Code of stock       |
| `quantity`   | `number` | **Required**. Investment quantity |

##### Preview return
```json
{
  "stockSold": "XPBR31",
  "quantity": 1,
  "value": 98.86
}
```

#### Get asset by code
```http
  GET /assets/AMZO34
```

##### Preview return
```json
{
  "stock": "AMZO34",
  "name": "AMAZON DRN",
  "value": 3.84,
  "volume": 231230,
  "logo": "https://s3-symbol-logo.tradingview.com/amazon--big.svg"
}
```

#### Get asset by code
```http
  GET /assets/AMZO34
```

##### Preview return
```json
[
  {
    "stock": "AMZO34",
    "name": "AMAZON DRN",
    "value": 3.84,
    "volume": 231230,
    "logo": "https://s3-symbol-logo.tradingview.com/amazon--big.svg"
  },
  {
    "stock": "XPBR31",
    "name": "XP INC DR1",
    "value": 98.86,
    "volume": 6398,
    "logo": "https://s3-symbol-logo.tradingview.com/xp--big.svg"
  },
  {...}
]
```
