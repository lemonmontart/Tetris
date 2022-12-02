//블럭 하나당 90도씩 돌렸을때 네개의 모양을 갖는다. 그래서 블럭안에 4개의 배열이 들어가는것
//배열 안에는 좌표값 형태로 또 다른 배열을 갖는다.
const BLOCKS = {
    tree:[
        [[2, 1], [0, 1], [1, 0], [1, 1]],
        [[1, 2], [0, 1], [1, 0], [1, 1]],
        [[1, 2], [0, 1], [2, 1], [1, 1]],
        [[2, 1], [1, 2], [1, 0], [1, 1]]
    ],
    square:[
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [0, 1], [1, 0], [1, 1]]
    ],
    bar:[
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[2, -1], [2, 0], [2, 1], [2, 2]]
    ],
    zee:[
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 1], [1, 0], [1, 1], [0, 2]],
        [[0, 1], [1, 1], [1, 2], [2, 2]],
        [[2, 0], [2, 1], [1, 1], [1, 2]]
    ],
    elLeft:[
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[1, 0], [1, 1], [1, 2], [0, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]],
        [[1, 0], [2, 0], [1, 1], [1, 2]]
    ],
    elRight:[
        [[1, 0], [2, 0], [1, 1], [1, 2]],
        [[0, 0], [0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 1], [2, 1], [2, 2]]
    ]
}

export default BLOCKS;