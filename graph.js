class Node {
    constructor(value) {
      this.value = value;
      this.adjacent = [];
    }
  }
  
  class Graph {
    constructor() {
      this.nodes = new Set();
    }
  
    addVertex(node) {
      this.nodes.add(node);
    }
  
    addVertices(nodes) {
      nodes.forEach(node => this.addVertex(node));
    }
  
    addEdge(node1, node2) {
      node1.adjacent.push(node2);
      node2.adjacent.push(node1);
    }
  
    removeEdge(node1, node2) {
      node1.adjacent = node1.adjacent.filter(adjNode => adjNode !== node2);
      node2.adjacent = node2.adjacent.filter(adjNode => adjNode !== node1);
    }
  
    removeVertex(nodeToRemove) {
      this.nodes.forEach(node => this.removeEdge(nodeToRemove, node));
      this.nodes.delete(nodeToRemove);
    }
  
    depthFirstSearch(startNode) {
      const visited = new Set();
      const result = [];
  
      function dfs(node) {
        if (!node || visited.has(node)) {
          return;
        }
  
        visited.add(node);
        result.push(node.value);
  
        for (const adjacentNode of node.adjacent) {
          dfs(adjacentNode);
        }
      }
  
      dfs(startNode);
      return result;
    }
  
    breadthFirstSearch(startNode) {
      const visited = new Set();
      const result = [];
      const queue = [startNode];
  
      while (queue.length > 0) {
        const current = queue.shift();
  
        if (!visited.has(current)) {
          visited.add(current);
          result.push(current.value);
  
          for (const adjacentNode of current.adjacent) {
            queue.push(adjacentNode);
          }
        }
      }
  
      return result;
    }
  }
  
  
  let graph = new Graph();
  let S = new Node('S');
  let P = new Node('P');
  let U = new Node('U');
  let X = new Node('X');
  let Q = new Node('Q');
  let Y = new Node('Y');
  let V = new Node('V');
  let R = new Node('R');
  let W = new Node('W');
  let T = new Node('T');
  
  graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);
  
  graph.addEdge(S, P);
  graph.addEdge(S, U);
  graph.addEdge(P, X);
  graph.addEdge(U, X);
  graph.addEdge(P, Q);
  graph.addEdge(U, V);
  graph.addEdge(X, Q);
  graph.addEdge(X, Y);
  graph.addEdge(X, V);
  graph.addEdge(Q, R);
  graph.addEdge(Y, R);
  graph.addEdge(Y, W);
  graph.addEdge(V, W);
  graph.addEdge(R, T);
  graph.addEdge(W, T);
  
  console.log(graph.depthFirstSearch(S)); // ["S", "P", "X", "Q", "R", "Y", "W", "T", "U", "V"]
  console.log(graph.breadthFirstSearch(S)); // ["S", "P", "U", "X", "Q", "V", "Y", "R", "W", "T"]