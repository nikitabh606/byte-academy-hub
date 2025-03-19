
export interface Topic {
  id: string;
  title: string;
  description: string;
  slug: string;
  count?: number;
}

export const topics: Topic[] = [
  {
    id: "1",
    title: "Arrays",
    description: "Fundamental data structure for storing elements of the same type.",
    slug: "arrays",
    count: 73
  },
  {
    id: "2",
    title: "Introduction to DSA",
    description: "Primer on Data Structures and Algorithms.",
    slug: "introduction-to-dsa"
  },
  {
    id: "3",
    title: "Binary Search",
    description: "Efficient searching algorithm for sorted arrays.",
    slug: "binary-search",
    count: 18
  },
  {
    id: "4",
    title: "Binary Search Tree",
    description: "Hierarchical data structure with efficient search, insertion, and deletion operations.",
    slug: "binary-search-tree",
    count: 7
  },
  {
    id: "5",
    title: "Binary Tree",
    description: "Tree data structure where each node has at most two children.",
    slug: "binary-tree",
    count: 15
  },
  {
    id: "6",
    title: "Bit Manipulation",
    description: "Manipulating individual bits to perform operations.",
    slug: "bit-manipulation"
  },
  {
    id: "7",
    title: "C++",
    description: "Powerful programming language often used for DSA implementations.",
    slug: "cpp"
  },
  {
    id: "8",
    title: "CS Core",
    description: "Essential concepts in Computer Science.",
    slug: "cs-core"
  },
  {
    id: "9",
    title: "Data Structures",
    description: "Fundamental building blocks for organizing and storing data efficiently.",
    slug: "data-structures"
  },
  {
    id: "10",
    title: "Dynamic Programming",
    description: "Method for solving complex problems by breaking them down into simpler subproblems.",
    slug: "dynamic-programming",
    count: 13
  },
  {
    id: "11",
    title: "Graph",
    description: "Non-linear data structure consisting of nodes and edges.",
    slug: "graph",
    count: 19
  },
  {
    id: "12",
    title: "Hashing",
    description: "Technique to map data of arbitrary size to fixed-size values.",
    slug: "hashing",
    count: 12
  },
  {
    id: "13",
    title: "Recursion",
    description: "Process where a function calls itself as a subroutine.",
    slug: "recursion",
    count: 12
  },
  {
    id: "14",
    title: "Linked List",
    description: "Linear data structure where elements are stored in nodes with references to the next node.",
    slug: "linked-list",
    count: 10
  },
  {
    id: "15",
    title: "Greedy",
    description: "Algorithmic paradigm that makes the locally optimal choice at each stage.",
    slug: "greedy",
    count: 6
  },
  {
    id: "16",
    title: "Stack",
    description: "Abstract data type that follows the Last In First Out principle.",
    slug: "stack",
    count: 6
  },
  {
    id: "17",
    title: "Sorting",
    description: "Algorithms to arrange data in a specific order.",
    slug: "sorting",
    count: 5
  }
];
