<h1 align="center">
  <br>
  <a href="https://github.com/ogom/crione"><img src="https://raw.githubusercontent.com/ogom/crione/master/assets/icon.png" alt="Crione" width="200"></a>
  <br>
  Crione
  <br>
</h1>

[![Build Status](https://travis-ci.org/ogom/crione.svg?branch=master)](https://travis-ci.org/ogom/crione)

Crione is [GR-CITRUS](http://gadget.renesas.com/ja/product/citrus.html) GUI client.

[![https://gyazo.com/6c627c8238512683f3aef303f43ddf82](https://i.gyazo.com/6c627c8238512683f3aef303f43ddf82.gif)](https://gyazo.com/6c627c8238512683f3aef303f43ddf82)

## Features

* GUI Editor and Serial teraterm.
* Port to be selected in the automatic to see the manufacturer of RENESAS.
* Compile [mruby](http://mruby.org/) and Send Textfile.

## Requirements

* [mruby](https://github.com/mruby/mruby)
* [Serialport](https://github.com/EmergingTechnologyAdvisors/node-serialport)

## Installation

### mruby

```bash
$ git clone https://github.com/mruby/mruby.git
$ cd mruby/
$ make
```

### crione

```bash
$ git clone https://github.com/ogom/crione.git
$ cd crione/
$ npm install
$ npm run rebuild:mac
$ npm start
```

## Usage

### Connect to the gadget.

[![https://gyazo.com/be810ad5b7aebcd66af9bc55feb9569a](https://i.gyazo.com/be810ad5b7aebcd66af9bc55feb9569a.png)](https://gyazo.com/be810ad5b7aebcd66af9bc55feb9569a)

### Select the file of mrbc

[![https://gyazo.com/608f5444de996e49ceef681c004210be](https://i.gyazo.com/608f5444de996e49ceef681c004210be.png)](https://gyazo.com/608f5444de996e49ceef681c004210be)

### Edit the programming code.

[![https://gyazo.com/8cff9304bdd187745ef5e7f1cc369610](https://i.gyazo.com/8cff9304bdd187745ef5e7f1cc369610.png)](https://gyazo.com/8cff9304bdd187745ef5e7f1cc369610)

### Writing and Running on the gadget.

[![https://gyazo.com/64eb88d012cea2361ae79a847fdf360a](https://i.gyazo.com/64eb88d012cea2361ae79a847fdf360a.png)](https://gyazo.com/64eb88d012cea2361ae79a847fdf360a)

## Build

```bash
$ npm run build
$ npm run start:production
```

## Tests

```bash
$ npm test
```

## Licence

* MIT
