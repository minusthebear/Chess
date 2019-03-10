import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SQUARES } from './constants';

const Grid = (props) => {

    // const grid = {};

    // const boundary = {
    //     min: 1,
    //     max: 8
    // };

    // const letters = {
    //     1: 'a',
    //     2: 'b',
    //     3: 'c',
    //     4: 'd',
    //     5: 'e',
    //     6: 'f',
    //     7: 'g',
    //     8: 'h'
    // }

    // for (var i = boundary.min; i <= boundary.max; i++) {
    //     grid[i] = {};
    //     grid[i].id = i;
    //     for (var j = boundary.min; j <= boundary.max; j++) {
    //         grid[i][j] = {};
    //         grid[i][j].id = letters[j] + i;
    //     }
    // }

    let squares = [];

    for (let i = 1; i <= 64; i++) {

        let row = Math.ceil(i / 8);

      squares.push(
        <Square id={i} key={i} row={row}>
        </Square>
      );
    }

    // <div>
    //     <GridRow className="row test-this-shit" row="1" />
    //     <GridRow className="row test-this-shit" row="2" />
    //     <GridRow className="row test-this-shit" row="3" />
    //     <GridRow className="row test-this-shit" row="4" />
    //     <GridRow className="row test-this-shit" row="5" />
    //     <GridRow className="row test-this-shit" row="6" />
    //     <GridRow className="row test-this-shit" row="7" />
    //     <GridRow className="row test-this-shit" row="8" />
    // </div>

    return ( 
        <div className="">
            {squares}
        </div>
    );
};

const Square = (props) => {

    return (
        <div className="test-square">
            {props.row}
        </div>
    );
};

class App extends Component {


    render() {
        return ( 
            <div className = "container" >
                <div className = "row" >
                    <div className = "col-xs-12" >
                        <Grid />
                    </div> 
                </div > 
            </div>
        );
    }
}

export default App;