var NEXTFIGURE_HEIGHT = 4;
var NEXTFIGURE_WIDTH = 4;

var PATTERNS = [
    {
        color: '#90ee90',
        rotations: [
            {
                startx:4,
                starty:0,
                shiftx:[],
                map:[
                    [1, 1],
                    [1, 1]
                ]
            }
        ]
    },
    {
        color: '#ffa07a',
        rotations: [
            {
                startx: 4,
                starty: 0,
                shiftx: [-1],
                map:[
                    [0, 1, 0],
                    [1, 1, 0],
                    [0, 1, 0]
                ]
            },
            {
                startx: 4,
                starty: 0,
                shiftx: [],
                map:[
                    [0, 1, 0],
                    [1, 1, 1],
                    [0, 0, 0]
                ]
            },
            {
                startx: 4,
                starty: 0,
                shiftx: [1],
                map:[
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 1, 0]
                ]
            },
            {
                startx: 4,
                starty: -1,
                shiftx: [],
                map:[
                    [0, 0, 0],
                    [1, 1, 1],
                    [0, 1, 0]
                ]
            }
        ]
    },
    {
        color: '#87cefa',
        rotations: [
            {
                startx: 4,
                starty: 0,
                shiftx: [-1],
                map:[
                    [0, 1, 0],
                    [1, 1, 0],
                    [1, 0, 0]
                ]
            },
            {
                startx: 4,
                starty: -1,
                shiftx: [],
                map:[
                    [0, 0, 0],
                    [1, 1, 0],
                    [0, 1, 1]
                ]
            }
        ]
    },
    {
        color: '#ffd700',
        rotations: [
            {
                startx: 4,
                starty: 0,
                shiftx: [1],
                map:[
                    [0, 1, 0],
                    [0, 1, 1],
                    [0, 0, 1]
                ]
            },
            {
                startx: 4,
                starty: -1,
                shiftx: [],
                map:[
                    [0, 0, 0],
                    [0, 1, 1],
                    [1, 1, 0]
                ]
            }
        ]
    },
    {
        color: '#20b2aa',
        rotations: [
            {
                startx: 3,
                starty: 0,
                shiftx: [-1, 1, 2],
                map:[
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [],
                map:[
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ]
            }
        ]
    },
    {
        color: '#d2691e',
        rotations: [
            {
                startx: 3,
                starty: 0,
                shiftx: [-1, 1],
                map:[
                    [0, 0, 1, 0],
                    [0, 0, 1, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [1],
                map:[
                    [0, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 1],
                    [0, 0, 0, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [-1, 1],
                map:[
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 1, 0, 0],
                    [0, 1, 0, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [-1],
                map:[
                    [0, 0, 0, 0],
                    [1, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 0]
                ]
            }
        ]
    },
    {
        color: '#ba55d3',
        rotations: [
            {
                startx: 3,
                starty: 0,
                shiftx: [-1, 1],
                map:[
                    [0, 1, 0, 0],
                    [0, 1, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 0, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [1],
                map:[
                    [0, 0, 0, 0],
                    [0, 1, 1, 1],
                    [0, 1, 0, 0],
                    [0, 0, 0, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [-1, 1],
                map:[
                    [0, 0, 0, 0],
                    [0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [0, 0, 1, 0]
                ]
            },
            {
                startx: 3,
                starty: -1,
                shiftx: [-1],
                map:[
                    [0, 0, 0, 0],
                    [0, 0, 1, 0],
                    [1, 1, 1, 0],
                    [0, 0, 0, 0]
                ]
            }
        ]
    }
];