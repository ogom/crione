<h1 align="center">
  <br>
  <a href="https://github.com/ogom/crione"><img src="https://raw.githubusercontent.com/ogom/crione/master/assets/icon.png" alt="Crione" width="200"></a>
  <br>
  Crione
  <br>
</h1>

[![Build Status](https://travis-ci.org/ogom/crione.png?branch=master)](https://travis-ci.org/ogom/crione)

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

```bash
$ git clone https://github.com/ogom/crione.git
$ cd crione/
$ npm install
$ npm start
```

## Usage

### Connect to the gadget.

[![https://gyazo.com/be810ad5b7aebcd66af9bc55feb9569a](https://i.gyazo.com/be810ad5b7aebcd66af9bc55feb9569a.png)](https://gyazo.com/be810ad5b7aebcd66af9bc55feb9569a)

### Edit the programming code.

[![https://gyazo.com/8cff9304bdd187745ef5e7f1cc369610](https://i.gyazo.com/8cff9304bdd187745ef5e7f1cc369610.png)](https://gyazo.com/8cff9304bdd187745ef5e7f1cc369610)

### Writing and Running on the gadget.

[![https://gyazo.com/3fa9819a41d56b2feef41ae322b5963c](https://i.gyazo.com/3fa9819a41d56b2feef41ae322b5963c.png)](https://gyazo.com/3fa9819a41d56b2feef41ae322b5963c)

## Tests

```bash
$ npm test
```

## Licence

* MIT
