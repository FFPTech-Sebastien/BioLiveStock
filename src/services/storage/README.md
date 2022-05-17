# Storage folder

This folder contains all the services that are used to communicate with the device's storage.

## [Storage](./storage.ts)

### Methods

#### _getItem_

#### Usage

Gets an item on the device's storage from a key.

#### Signature

```js
getItem = (key: string): Promise<string | null>;
```

#### _setItem_

#### Usage

Sets an item on the device's storage from a key and a value.

#### Signature

```js
setItem = (key: string, value: any): Promise<void>;
```

#### _deleteItem_

#### Usage

Deletes an item on the device's storage from a key.

#### Signature

```js
deleteItem = (key: string): Promise<void>;
```
