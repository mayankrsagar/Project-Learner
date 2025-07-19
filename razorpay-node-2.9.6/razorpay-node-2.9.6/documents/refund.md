## Refunds

### Create a normal refund

```js
instance.payments.refund(paymentId,{
  "amount": "100",
  "speed": "normal",
  "notes": {
    "notes_key_1": "Beam me up Scotty.",
    "notes_key_2": "Engage"
  },
  "receipt": "Receipt No. 31"
})
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
|  paymentId*   | string      | The id of the payment                       |
|  amount       | integer      | The amount to be captured (should be equal to the authorized amount, in paise) |                       |
|  speed        | string      | Here, it must be normal                |
|  notes        | array       | A key-value pair                |
|  receipt      | string      | A unique identifier provided by you for your internal reference. |

**Response:**
```json
{
  "id": "rfnd_FP8QHiV938haTz",
  "entity": "refund",
  "amount": 500100,
  "receipt": "Receipt No. 31",
  "currency": "INR",
  "payment_id": "pay_FCXKPFtYfPXJPy",
  "notes": [],
  "acquirer_data": {
    "arn": null
  },
  "created_at": 1597078866,
  "batch_id": null,
  "status": "processed",
  "speed_processed": "normal",
  "speed_requested": "normal"
}
```
-------------------------------------------------------------------------------------------------------

### Create an instant refund

```js
instance.payments.refund(paymentId,{
  "amount": "100",
  "speed": "optimum",
  "receipt": "Receipt No. 31"
})
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
|  paymentId*  | string      | The id of the payment                       |
|  amount       | integer      | The amount to be captured (should be equal to the authorized amount, in paise) |
|  speed*        | string      | Here, it must be optimum                    |
|  receipt      | string      | A unique identifier provided by you for your internal reference. |

**Response:**
```json
{
  "id": "rfnd_FP8R8EGjGbPkVb",
  "entity": "refund",
  "amount": 500100,
  "currency": "INR",
  "payment_id": "pay_FC8MmhMBZPKDHF",
  "notes": {
    "notes_key_1": "Tea, Earl Grey, Hot",
    "notes_key_2": "Tea, Earl Grey… decaf."
  },
  "receipt": "Receipt No. 31",
  "acquirer_data": {
    "arn": null
  },
  "created_at": 1597078914,
  "batch_id": null,
  "status": "processed",
  "speed_requested": "optimum"
}
```
-------------------------------------------------------------------------------------------------------

### Fetch multiple refunds for a payment

```js
instance.payments.fetchMultipleRefund(paymentId,option)
```

**Parameters:**

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| paymentId*  | string      | The id of the payment                       |
| from  | timestamp | timestamp after which the payments were created  |
| to    | timestamp | timestamp before which the payments were created |
| count | integer   | number of refunds to fetch (default: 10)        |
| skip  | integer   | number of refunds to be skipped (default: 0)    |

**Refund:**
```json
{
  "entity": "collection",
  "count": 1,
  "items": [
    {
      "id": "rfnd_FP8DDKxqJif6ca",
      "entity": "refund",
      "amount": 300100,
      "currency": "INR",
      "payment_id": "pay_FIKOnlyii5QGNx",
      "notes": {
        "comment": "Comment for refund"
      },
      "receipt": null,
      "acquirer_data": {
        "arn": "10000000000000"
      },
      "created_at": 1597078124,
      "batch_id": null,
      "status": "processed",
      "speed_processed": "normal",
      "speed_requested": "optimum"
    }
  ]
}
 ```
-------------------------------------------------------------------------------------------------------

### Fetch a specific refund for a payment
```js
instance.payments.fetchRefund(paymentId,refundId)
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
|  paymentId*   | string      | The id of the payment to be fetched        |
|  refundId*   | string      | The id of the refund to be fetched           |

**Response:**
```json
{
  "id": "rfnd_FP8DDKxqJif6ca",
  "entity": "refund",
  "amount": 300100,
  "currency": "INR",
  "payment_id": "pay_FIKOnlyii5QGNx",
  "notes": {
    "comment": "Comment for refund"
  },
  "receipt": null,
  "acquirer_data": {
    "arn": "10000000000000"
  },
  "created_at": 1597078124,
  "batch_id": null,
  "status": "processed",
  "speed_processed": "normal",
  "speed_requested": "optimum"
}
```
-------------------------------------------------------------------------------------------------------

### Fetch all refunds
```js
instance.refunds.all(options)
```

**Parameters:**

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| from  | timestamp | timestamp after which the payments were created  |
| to    | timestamp | timestamp before which the payments were created |
| count | integer   | number of payments to fetch (default: 10)        |
| skip  | integer   | number of payments to be skipped (default: 0)    |

**Response:**
```json
{
  "entity": "collection",
  "count": 2,
  "items": [
    {
      "id": "rfnd_FFX6AnnIN3puqW",
      "entity": "refund",
      "amount": 88800,
      "currency": "INR",
      "payment_id": "pay_FFX5FdEYx8jPwA",
      "notes": {
        "comment": "Issuing an instant refund"
      },
      "receipt": null,
      "acquirer_data": {},
      "created_at": 1594982363,
      "batch_id": null,
      "status": "processed",
      "speed_processed": "optimum",
      "speed_requested": "optimum"
    }
  ]
}
```
-------------------------------------------------------------------------------------------------------

### Fetch particular refund
```js
instance.refunds.fetch(refundId)
```

**Parameters:**

| Name          | Type        | Description                                 |
|---------------|-------------|---------------------------------------------|
|  refundId*   | string      | The id of the refund to be fetched           |

**Response:**
```json
{
  "id": "rfnd_EqWThTE7dd7utf",
  "entity": "refund",
  "amount": 6000,
  "currency": "INR",
  "payment_id": "pay_EpkFDYRirena0f",
  "notes": {
    "comment": "Issuing an instant refund"
  },
  "receipt": null,
  "acquirer_data": {
    "arn": "10000000000000"
  },
  "created_at": 1589521675,
  "batch_id": null,
  "status": "processed",
  "speed_processed": "optimum",
  "speed_requested": "optimum"
}
```
-------------------------------------------------------------------------------------------------------

### Update the refund
```js
instance.refunds.edit(refundId,{
  "notes": {
    "notes_key_1": "Beam me up Scotty.",
    "notes_key_2": "Engage"
  }
})
```

**Parameters:**

| Name  | Type      | Description                                      |
|-------|-----------|--------------------------------------------------|
| refundId*   | string    | The id of the refund to be fetched     |
| notes* | array  | A key-value pair                                 |

**Response:**
```json
{
  "acquirer_data": {
    "arn": "JhIzh5MwYhsVj7"
  },
  "amount": 10000,
  "batch_id": null,
  "created_at": 1655194550,
  "currency": "INR",
  "entity": "refund",
  "id": "rfnd_JhIzTq6K16lpnn",
  "notes": {
    "notes_key_1": "Beam me up Scotty.",
    "notes_key_2": "Engage"
  },
  "payment_id": "pay_JXPULbHbkkkS8D",
  "receipt": null,
  "speed_processed": "instant",
  "speed_requested": "optimum",
  "status": "processed"
}
```
-------------------------------------------------------------------------------------------------------

**PN: * indicates mandatory fields**
<br>
<br>
**For reference click [here](https://razorpay.com/docs/api/refunds/)**