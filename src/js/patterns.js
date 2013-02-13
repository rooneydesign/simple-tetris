var PATTERNS = [
    [
        {
            startx: 4,
            starty: 0,
            shifts: [],
            pattern: [
                [1, 1],
                [1, 1]
            ]
        }
    ],
    [
        {
            startx: 4,
            starty: 0,
            shifts: [-1],
            pattern:[
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]
        },
        {
            startx: 4,
            starty: 0,
            shifts: [],
            pattern:[
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ]
        },
        {
            startx: 4,
            starty: 0,
            shifts: [1],
            pattern:[
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ]
        },
        {
            startx: 4,
            starty: -1,
            shifts: [],
            pattern:[
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ]
        }
    ],
    [
        {
            startx: 4,
            starty: 0,
            shifts: [-1],
            pattern:[
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0]
            ]
        },
        {
            startx: 4,
            starty: -1,
            shifts: [],
            pattern:[
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1]
            ]
        }
    ],
    [
        {
            startx: 4,
            starty: 0,
            shifts: [1],
            pattern:[
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1]
            ]
        },
        {
            startx: 4,
            starty: -1,
            shifts: [],
            pattern:[
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0]
            ]
        }
    ],
    [
        {
            startx: 3,
            starty: 0,
            shifts: [-1, 1, 2],
            pattern:[
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [],
            pattern:[
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        }
    ],
    [
        {
            startx: 3,
            starty: 0,
            shifts: [-1, 1],
            pattern:[
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [1],
            pattern:[
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 1],
                [0, 0, 0, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [-1, 1],
            pattern:[
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [-1],
            pattern:[
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0]
            ]
        }
    ],
    [
        {
            startx: 3,
            starty: 0,
            shifts: [-1, 1],
            pattern:[
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [1],
            pattern:[
                [0, 0, 0, 0],
                [0, 1, 1, 1],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [-1, 1],
            pattern:[
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0]
            ]
        },
        {
            startx: 3,
            starty: -1,
            shifts: [-1],
            pattern:[
                [0, 0, 0, 0],
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0]
            ]
        }
    ]
];