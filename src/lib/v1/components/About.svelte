<h2>V1</h2>

<p>A very first exploration of Wave function collapse</p>

<p>
    "Tiles" allows to create new tiles and save them to the local storage. For now the sprites are
    saved as arrays of 0 and 1 to describe black and white pixels. This is not convenient, I want to
    be able to save sprites as images directly
</p>

<p>
    "Connections" display the hard coded connections. For now there is now way to edit them but they
    are still retrieved from the local storage after the first run.
</p>

<p>
    "Grid" is my first implementation of WFC. The not collapsed cells display only the id of their
    possible tiles. I haven't implemented backtracking yet so the error handling is crappy.
</p>

<p>
    One thing I need to figure out: When removing the impossible state we only considerate the
    direct neighbors of the collapsed cells. I think doing that recursively (eliminating the states
    made impossible by the first removals) would make it more interesting.
</p>
