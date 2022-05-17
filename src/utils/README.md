# Utils folder

This folder contains the helpers/utils used by the app.

## Structure

```
|── utils/
        ├── colors.ts
        ├── time.ts
        └── index.ts
```

## [Colors](./colors.ts)

### Type

```js
type RgbColor = {
    r: number, // red
    g: number, // green
    b: number, // blue
};
```

### Methods

#### _isColorDark_

#### Usage

Used to know if a color is dark or light.

#### Signature

```js
isColorDark = (color: string): boolean;
```

#### _hexToRgb_

#### Usage

Converts a hexadecimal color to an RGB color.

#### Signature

```js
hexToRgb = (hex: string): RgbColor | null;
```

#### _colorDependingOnBackground_

#### Usage

Gets the correct color depending of the brightness of the background.

#### Signature

```js
colorDependingOnBackground = (color: string): string;
```

## [Time](./time.ts)

### Methods

#### _wait_

#### Usage

Simulates api call by providing a delay.

#### Signature

```js
wait = (timeout: number): Promise<void>;
```
