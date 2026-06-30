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
    console.log(`This is the order of visitation for Breadth-First Search`, visited)// print the nodes we visited in order
}

bfs(graph, 'A')

const dfs = (graphCanvas, start) => {
     //this makes us go through 
    const stack = [] //working stack, LIFO
    const visited = new Set() //visited

    stack.push(start)
    visited.add(start)
    console.log(`This is the order of visitation for Depth-First Search`)
    while(stack.length > 0){
        const current =  stack.pop() //store what vertex we are currently visiting, notice we pop here as opposed to shifting, as we use a stack in dfs
        console.log('Visiting:', current)  // log when actually processing
        for(const neighbour of graphCanvas[current]){
            if(visited.has(neighbour.to)){
                continue
            }
            stack.push(neighbour.to)
            visited.add(neighbour.to)
        }
        //you aklso notice that we cant log the visited set as it wont show the real order of visitation, because visited pushes every touched vertex rather than
        //show in order of what vertex was worked on in order

    }
}

dfs(graph, 'A')




const getPath = (parent,target) => {
    const pathArr = []
    pathArr.push(target)
    let curr = parent[target]
    while(curr){
        pathArr.push(curr)
        curr = parent[curr]
    }

    
    const path = pathArr.reverse().join(" -> ")

    console.log(path)


}

const bfsWithPath = (graphCanvas, start) => {
  const queue = [start]
  const visited = new Set([start])
  const parent = {}  // parent[node] = the node that discovered it

  while (queue.length > 0) {
    const current = queue.shift()
    for (const neighbour of graph[current]) {
      if (visited.has(neighbour.to)) continue
      visited.add(neighbour.to)
      parent[neighbour.to] = current  // record who found this node
      queue.push(neighbour.to)
    }
  }

  return parent
}

getPath(bfsWithPath(graph, "A"), "E")
