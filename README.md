# Configurio

The library provides hook and components for custom rendering of 3d configurator.

## Installation

Install configurio with npm or yarn

```bash
  npm install @rromikas/configurio three
  yarn add @rromikas/configurio three
```

## Usage

```javascript
import { useConfigurio } from '@rromikas/configurio'

function App() {

  const {
      modelViewer, // React element which fills container size
      options
      } = useConfigurio("6")

  return  <div style={{width: 800, height: 400, display:"flex"}}>
            <div style={{flexGrow: 1}}>{modelViewer}</div>
            <div style={{width: 300, flexShrink:0}}>{options.map(option => {...})}</div>
          </div>
}
```
