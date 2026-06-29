const graph = {
    A: [{to: 'B', weight: 4}, {to: 'C', weight: 2}],
    B: [{to: 'A', weight: 4}, {to: 'D', weight: 3}],
    C: [{to: 'A', weight: 2}, {to: 'D', weight: 1}],
    D: [{to: 'C', weight: 1}, {to: 'E', weight: 5}],
    E: [{to: 'D', weight: 5}]
}

const bfs = (graphCanvas, start) => {
    //this makes us go through every node level by level, meaning we must first go through eveyr part of node A before goin to node B
    const queue = [] //working queue
    const visited = new Set() //visited

    queue.push(start) //push the starting node
    visited.add(start) //we have also visited starting node
    while (queue.length > 0){ //while queue is not empty
        for (const neighbour of graphCanvas[queue[0]]){ //for every neigbour in the adjacency list of a node
            if(visited.has(neighbour.to)){
                continue // if we have already visited this node/neigbour, skip it and move on to the net one
            }
            queue.push(neighbour.to) //add it to working queue
            visited.add(neighbour.to) //mark it as visited
        }
        queue.shift() //remove the node we just worked with from front of queue
    }
    console.log(visited)// print the nodes we visited in order
}

bfs(graph, 'A')